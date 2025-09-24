// importing mongoose to access Schema
const mongoose = require('mongoose');
// Schema will help use build our mongodb schemas
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  value: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Todo", TodoSchema);