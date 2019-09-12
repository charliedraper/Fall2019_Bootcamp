var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

//Listing Schema
var listingSchema = new Schema({
  code: {type: String, required: true},
  name: {type: String, required: true},
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  address: String
});

//Before saving, do the following
listingSchema.pre('save', function(next) {
  //Get the current date
  var currentDate = new Date();

  //Change the updated_at field to the current date
  this.updated_at = currentDate;

  //If created_at doesn't exist, add that to the field
  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

//Instantiate and export a mongoose model
var Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
