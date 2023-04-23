const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/WebCouse_Learning`);
    console.log("success");
  } catch (error) {
    console.log("fail");
  }
}
module.exports = { connect };
