'use strict';
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

//Connect database to mongoose
mongoose.connect(config.db.uri, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//Read in the listing data, and for each entry instantiate a mongoose listing model
fs.readFile('listings.json', 'utf8', function(err, data) {
  if (err) throw err;

  var listingData = JSON.parse(data);
  listingData.entries.forEach(function(listing) {
    new Listing(listing).save();
  });
});
