const express = require('express');
//const chalk = require('chalk');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override');
const postRoutes = require('./routes/post-routes');
const contactRouter = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');
const postApiRouter = require('./routes/api-post-routes');
//const errorMsg = chalk.bgKeyword('white').redBright;
//const successMsg =chalk.bgKeyword('green').white;
const app = express();

const { read } = require('fs');
app.set('view engine', 'ejs');
mongoose.set('strictQuery', true);


mongoose
.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => console.log('Connected to DB'))
.catch((err) => console.log(err));


app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({extended: false}));
app.use(express.static('styles'));
app.use(methodOverride('__method'));

app.use(postApiRouter);
app.use(contactRouter);
app.use(postRoutes);
app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});
app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
