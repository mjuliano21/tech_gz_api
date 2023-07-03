const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
const routes = require('./routes');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log('|Server Started at http://localhost:5000'));
