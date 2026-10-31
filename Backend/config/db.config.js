const mongoose = require('mongoose');

exports.dbConfig = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be configured.");
  }

  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Database connected");
};