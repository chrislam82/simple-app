const express = require('express'); // import express module

const fs = require('fs');
const cors = require('cors');
const lockFile = require('proper-lockfile');

const app = express();              // create app from express library
const port = 5000;

const DATASTORE = './msgs.json';

let msgData = {};

const retryOptions = {
  retries: 3,
  randomize: true,
}

app.use(cors());                    // middleware to enable CORS on all routes of express app
app.use(express.json());            // pass all req.body as JSON

app.get('/:routename', (req, res) => {
  console.log(`GET message with key "${req.params.routename}"`);

  let messageText = "";
  if (req.params.routename in msgData) {
    messageText = msgData[req.params.routename];
  }
  res.send({
    "status": "success",
    "message": messageText,
  })
});

app.post('/:routename', (req, res) => {
  console.log(`POST message with key "${req.params.routename}"`);

  if (req.body.message) {
    updateLocker(req.params.routename, req.body.message)
    .then(() => {
      console.log("   Updated DATASTORE successfully");
      res.send({
        "status": "success",
      })
    }).catch(err => {
      console.log(`   Unsuccessful in updating DATASTORE: ${err}`);
      res.sendStatus(500);
    })
  } else {
    console.log("   Client did not include new message in request body");
    res.sendStatus(400);
  }
});

const updateLocker = (key, msg) => new Promise((resolve, reject) => {
  console.log(`   Updating locker: ${key}`);

  lockFile.lock(DATASTORE, retryOptions)
  .then(release => {
    let newMsgData = msgData;
    newMsgData[key] = msg;

    updateData(newMsgData)
    .then(() => {
      msgData = newMsgData;
      resolve();
    }).catch(err => {
      reject(new Error(`Update to DATASTORE failed`));
    })
    release();
  }).catch(err => {
    reject(new Error(`Lock to update DATASTORE failed: ${err}`));
  })
});

const updateAll = (data) => new Promise ((resolve, reject) => {
  console.log(`   Updating all lockers`);

  lockFile.lock(DATASTORE, retryOptions)
  .then(release => {
    updateData(data)
    .then(() => {
      msgData = data;
      resolve();
    }).catch(err => {
      reject(new Error(`Update to DATASTORE failed`));
    })
    release();
  }).catch(err => {
    reject(new Error(`Lock to update DATASTORE failed: ${err}`));
  })
});

const updateData = (data) => new Promise((resolve, reject) => {
  try {
    fs.writeFile(DATASTORE, JSON.stringify(data), (err) => {
      if (err) {
        throw new Error(err);
      }
    })
    resolve();
  } catch(err) {
    reject(new Error(`Update to DATASTORE failed: ${err}`));
  }
})

const readData = () => new Promise((resolve, reject) => {
  console.log("   Reading DATASTORE...");

  lockFile.lock(DATASTORE, retryOptions)
  .then(release => {
    try {
      fs.readFile(DATASTORE, 'utf-8', (err, data) => {
        if (err) {
          throw new Error(err);
        }
        resolve(JSON.parse(data));
      })
    } catch(err) {
      reject(new Error(`Unable to read from DATASTORE: ${err}`));
    }
    release();
  }).catch(err => {
    reject(new Error(`Lock to read DATASTORE failed: ${err}`));
  })
});

readData()
.then(data => {
  msgData = data;
  console.log("Loaded data. App ready to start");

  // start running on port 5000 and logs in terminal running node what port we are running on
  app.listen(port, () => {
    console.log(`Express backend is running on port ${port}`);
  });
}).catch(err => {
  console.log(`Error loading data for starting App. ${err}`);
})
