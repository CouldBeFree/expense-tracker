const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

const errorHandler = require('./middleware/error');

// Initialize application
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

dotenv.config({ path: './config/config.env' });

// Routes
const auth = require('./routes/auth');
const incomes = require('./routes/incomes');
const expenses = require('./routes/expenses');
const total = require('./routes/total');

// Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/incomes', incomes);
app.use('/api/v1/expenses', expenses);
app.use('/api/v1/total', total);

app.use(errorHandler);

const port = process.env.PORT;

//DB connection
mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected')
});

//Launch server
app.listen(port, () => {
  console.log(`Server is running on the port ${port}`)
});