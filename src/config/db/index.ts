const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(
      `mongodb+srv://dinhkhactuan2002:060702002@cluster0.qzxx1kq.mongodb.net/WebCouse_Learning?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("success");
  } catch (error) {
    console.log("Not Connect");
  }
}
module.exports = { connect };
