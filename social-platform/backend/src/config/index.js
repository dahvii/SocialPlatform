const dotenv = require('dotenv');
// config() will read your .env file, parse the contents, assign it to process.env.
const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    databaseURL: process.env.MONGODB_URI,
};