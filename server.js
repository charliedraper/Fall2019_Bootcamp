var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {

  var parsedUrl = url.parse(request.url);

  //Respond with the listingData when a GET request is made to "/listings", and an error otherwise
  if (parsedUrl.pathname == "/listings") {
    response.writeHead(200);
    response.write(JSON.stringify(listingData));
    response.end();
  } else {
    response.writeHead(404);
    response.end("Bad gateway error");
  }

};

fs.readFile('listings.json', 'utf8', function(err, data) {

  //Check for errors
  if (err) throw err;

  //Save the data in the listingData variable already defined
  listingData = JSON.parse(data);

  //Create the server
  server = http.createServer(requestHandler);
    
  //Start the server
  server.listen(port, function() {
    console.log("Server listening on: http://127.0.0.1." + port);
  });

});
