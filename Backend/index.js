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

app.use(globalErrorHendleing);

const startServer = (currentPort) => {
  const server = app.listen(currentPort, () => {
    console.log(`Server is running on port ${currentPort}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.warn(`Port ${currentPort} is already in use. Trying ${currentPort + 1}...`);
      startServer(currentPort + 1);
    } else {
      console.error('Server error:', error);
      process.exit(1);
    }
  });
};
 
startServer(port);

module.exports = app;
