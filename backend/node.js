/*
node.js is basically runtime env that is a cmd-line interpreter for JS. It runs on the V8 Javascript Engine which compiles JS into macine code. We use it as a cmd-line interpreter (It interprets text entered by the user as a command line interface)
    node.js is like using Python3
    npm is like using pip3
- use npm to get packages from online which are installed in node_modules folder locally so that things can run on localhost without any internet access
- and then when running an app from online, using npm install to install all dependencies from package.json without having to also push locally installed modules into code repos themselves

Instead of forking for each request, Node uses JS callbacks to manage multiple requests, spawning threads only if there are blocking I/O that is causing throughput issues; Node is non-blocking, and asynchronous

Multi-threading in node.js
- node.js has 2 types of threads (event loop (the main callback) thread, and worker pool (worker threads)).
- NOTE: It also may have ability to spawn normal child threads but ill see (I think thats the same as a worker thread; thread under teh callback thread rather than an entire new thread for the I/O. Prob just different name used elsewhere)
- "Node.js being designed without threads doesn't mean you can't take advantage of multiple cores in your environment. Child processes can be spawned by using our child_process.fork() API, and are designed to be easy to communicate with. Built upon that same interface is the cluster module, which allows you to share sockets between processes to enable load balancing over your cores."
- Since node.js uses the v8 JS engine, it is still single-threaded mainly with async and non-blocking properties. However, if any computationally intensive tasks are required, node.js can split off worker threads that are less efficient than then main callback-driven thread to complete the computations and then return the results (using some inbuilt C library?)
- Only works on non-IO intensive tasks, since IO still handled by the main callback thread. the callback thread still handles all callbacks and worker threads simply perform computation before returnning results to callback thread
*/

const express = require('express'); // import express module
const app = express();              // create app from express library
const port = 3000;

// like flask, add a get restful route to /hello that returns Hello World!
// basically a route and handler 
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// start running on port 3000 and logs in terminal running node what port we are running on
app.listen(port, () => {
  console.log(`Example app is running on port ${port}`);
})
