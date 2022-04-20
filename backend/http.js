// using http nmodule instead of express module

// Load HTTP module
const http = require("http");

// define some variables for where server is asessable
const hostname = "127.0.0.1";
const port = 8000;

// Create HTTP server
// looks like no other endpoints at the moment
const server = http.createServer(function(req, res) {

   // Set the response HTTP header with HTTP status and Content type
   res.writeHead(200, {'Content-Type': 'text/plain'});

   // Send the response body "Hello World"
   res.end('Hello World\n');
});

// Prints a log once the server starts listening
// start server, with a function being passed in to server.listen as arg 3
server.listen(port, hostname, function() {
   console.log(`Server running at http://${hostname}:${port}/`);
})
