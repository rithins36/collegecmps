const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


const app = express();

const dbURI = "mongodb+srv://rithin:rithin123@cluster0.rty1bg1.mongodb.net/website?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=> console.log("db connected"))
.catch((err)=> console.log(err));

app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.listen(3000);

app.get('/', (req, res) => {
    res.render('index');
  }
);

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });