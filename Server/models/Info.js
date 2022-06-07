const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const infoSchema = new mongoose.Schema({
  infoName: {
    type: String,
    required: [true, "Please Input info Name!"],
  },
  type: {
    type: String,
    enum : ["Testimony","NearBy"],
    required: [true, "Please Input info type!"],
  },
  isHighlight: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: [true, "Please Input Description!"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  item: [
    {
      type: ObjectId,
      ref: "Item",
    },
  ],
});
module.exports = mongoose.model("Info", infoSchema);
