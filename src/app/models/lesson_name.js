const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema(
  {
    lessonName: {
      type: String,
    },
    Idvideo: {
      type: String,
    },
  },
  {
    collection: "lessons",
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("lessons", lessonSchema);
