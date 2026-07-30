require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const routes = require('./route');
const { globalErrorHendleing } = require('./utils/globalErrorHendleing');
const { dbConfig } = require('./config/db.config');
const app = express();
const port = process.env.PORT ;

// Middleware to parse JSON requests
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

// Start the server with error handling for occupied ports
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please stop the other process or choose a different port.`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});