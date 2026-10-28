const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env.local") });
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserModel = require("../model/User.model");

const adminEmail = "ashiquldeveloper11@gmail.com";
const adminPassword = process.env.ADMIN_PASSWORD;

async function seedAdmin() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be configured.");
  }
  if (!adminPassword || adminPassword.length < 8 || Buffer.byteLength(adminPassword) > 72) {
    throw new Error("Set ADMIN_PASSWORD to the initial admin password (8-72 bytes).");
  }
  await mongoose.connect(process.env.DATABASE_URL);
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  const existingAdmin = await UserModel.findOne({ email: adminEmail });

  if (existingAdmin) {
    existingAdmin.name = existingAdmin.name || "WebMarkio Administrator";
    existingAdmin.password = hashedPassword;
    existingAdmin.role = "admin";
    existingAdmin.status = "active";
    existingAdmin.tokenVersion = (existingAdmin.tokenVersion || 0) + 1;
    await existingAdmin.save();
  } else {
    await UserModel.create({
      name: "WebMarkio Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      status: "active",
    });
  }

  console.log(`Administrator account seeded for ${adminEmail}.`);
}

seedAdmin()
  .catch((error) => {
    console.error("Unable to seed administrator:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
  });
