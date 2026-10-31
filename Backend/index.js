<<<<<<< HEAD
const path = require("node:path");
const backendEnvPath = path.join(__dirname, ".env");
require("dotenv").config({ path: path.join(__dirname, ".env.local") });
require("dotenv").config({ path: backendEnvPath });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./route");
const { globalErrorHendleing } = require("./utils/globalErrorHendleing");
const { dbConfig } = require("./config/db.config");

const app = express();
const port = Number.parseInt(process.env.PORT, 10) || 5100;

app.disable("x-powered-by");
app.use(helmet());
const allowedOrigins = (
  process.env.FRONTEND_URL ||
  "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin is not allowed."));
  },
}));
app.use(express.json({ limit: "1mb" }));
app.use("/routes", routes);
=======
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const routes = require('./route');
const { globalErrorHendleing } = require('./utils/globalErrorHendleing');
const { dbConfig } = require('./config/db.config');
const app = express();
const port = Number.parseInt(process.env.PORT, 10) || 5100;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// Session configuration
app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        process.env.DATABASE_URL ||
        'mongodb+srv://ecommurce:ecommurce@cluster0.jtiah2x.mongodb.net/ecommurce?appName=Cluster0',
    }),
    name: 'webmarkio-session',
    secret: process.env.SESSION_SECRET || 'default_session_secret',
    rolling: true,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

dbConfig();
// Sample route
app.use('/routes', routes);

>>>>>>> origin/main
app.use(globalErrorHendleing);

const startServer = (currentPort) => {
  const server = app.listen(currentPort, () => {
    console.log(`Server is running on port ${currentPort}`);
  });

<<<<<<< HEAD
  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.warn(`Port ${currentPort} is already in use. Trying ${currentPort + 1}...`);
      startServer(currentPort + 1);
    } else {
      console.error("Server error:", error);
=======
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.warn(`Port ${currentPort} is already in use. Trying ${currentPort + 1}...`);
      startServer(currentPort + 1);
    } else {
      console.error('Server error:', error);
>>>>>>> origin/main
      process.exit(1);
    }
  });
};
<<<<<<< HEAD

if (require.main === module) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 characters.");
  }

  dbConfig()
    .then(() => startServer(port))
    .catch((error) => {
      console.error("Unable to start the API:", error.message);
      process.exitCode = 1;
    });
}
=======
 
startServer(port);
>>>>>>> origin/main

module.exports = app;
