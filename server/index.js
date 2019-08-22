const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

// Initialize application
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const user = require('./routes/user');

// Mount routes
app.use('/', user);

const port = 5050;

//DB connection
mongoose.connect('mongodb://localhost:27017/expense-tracker', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected')
});

//Launch server
app.listen(port, () => {
  console.log(`Server is running on the port ${port}`)
});