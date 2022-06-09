import fs from 'fs';
import lockFile from 'proper-lockfile';

const DATASTORE = './database/msgs.json';

let msgData = {};

const retryOptions = {
  retries: 3,
  randomize: true,
}

/************************************************************************
 *                        Write Functions                               *
 ***********************************************************************/

export const updateLocker = (key, msg) => new Promise((resolve, reject) => {
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

export const updateAll = (data) => new Promise ((resolve, reject) => {
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

/************************************************************************
 *                        Read Functions                                *
 ***********************************************************************/

export const readLocker = (locker) => {
  if (locker in msgData) {
    return msgData[locker];
  }
  return "";
}

export const readAll = () => msgData;

export const loadData = () => new Promise((resolve, reject) => {
  console.log("   Loading DATASTORE...");

  lockFile.lock(DATASTORE, retryOptions)
  .then(release => {
    try {
      msgData = JSON.parse(fs.readFileSync(DATASTORE, 'utf-8'));
      resolve();
    } catch(err) {
      reject(new Error(`Unable to read from DATASTORE: ${err}`));
    }
    release();
   resolve();
  }).catch(err => {
    reject(new Error(`Lock to read DATASTORE failed: ${err}`));
  })
})

/*
 * Sync load of DATASTORE
 * - If it doesn't exist, create DATASTORE and load empty JSON data
 */
export const initData = () => {
  console.log("   Initialising DATASTORE");

  if (fs.existsSync(DATASTORE)) {    
    msgData = JSON.parse(fs.readFileSync(DATASTORE, 'utf-8'));
  } else {
    console.log("   DATASTORE not found. Initialising new DATASTORE");
    fs.writeFileSync(DATASTORE, JSON.stringify(msgData));
  }
}
