const mongoose = require('mongoose');
const User = require('./user');

const connectDb = async (connectionURL) => {
  try {
    await mongoose.connect(connectionURL, {useNewUrlParser: true});
    console.log("DB connected...");
  } catch(err) {
    console.error(err);
  }
};


module.exports = {
  connectDb,
  User
};
