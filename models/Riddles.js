const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create RiddlesSchema
const RiddlesSchema = new Schema({
  Field_1: {
    type: String,
    required: true
  },
  Field_2: {
    type: String,
    required: true   
  }
});

// Create the SkillSet model with Mongoose. Note: riddles is the collections name in database 
const Riddles = mongoose.model('riddles', RiddlesSchema);

// Export the Model
module.exports = Riddles;