const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config({ path: './.env' });

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
const routes = readdirSync('./routes').filter(file => file.endsWith('.js'));
routes.forEach(route => {
  const routePath = `./routes/${route}`;
  app.use('/api/v1', require(routePath));
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
};

server();
