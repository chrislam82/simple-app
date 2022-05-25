
import express from 'express';

import cors from 'cors';

import {
  updateLocker,
  readLocker,
  loadData,
} from './database.js';

const app = express();              // create app from express library
const port = 5000;

// Middleware
app.use(cors());                    // enable CORS on all routes of express app
app.use(express.json());            // pass all req.body as JSON

/************************************************************************
 *                        Routes                                        *
 ***********************************************************************/
app.get('/:routename', (req, res) => {
  console.log(`GET message with key "${req.params.routename}"`);

  res.send({
    "status": "success",
    "message": readLocker(req.params.routename),
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

/************************************************************************
 *                        Start Server                                  *
 ***********************************************************************/

loadData()
.then(() => {
  console.log("Loaded data. App ready to start");

  // start running on port 5000 and logs in terminal running node what port we are running on
  app.listen(port, () => {
    console.log(`Express backend is running on port ${port}`);
  });
}).catch(err => {
  console.log(`Error loading data for starting App. ${err}`);
})