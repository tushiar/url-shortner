import mongoose from "mongoose";
var Schema = mongoose.Schema;

var url = new Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    required: true,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

mongoose.models = {};

var Url = mongoose.model("Url", url);

export default Url;
