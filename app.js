const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const College = require('./models/college');


const app = express();

const dbURI = "mongodb+srv://rithin:rithin123@cluster0.rty1bg1.mongodb.net/website?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=> console.log("db connected"))
.catch((err)=> console.log(err));

app.set('view engine', 'ejs');

// Middleware to disable strict MIME type checking
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// middleware & static files
app.use(express.static('public'));

app.listen(3000);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/mainpage', (req, res) => {
  res.render('mainpage');
});

app.get('/collegelist', (req, res) => {
  // res.render('collegelist');
  // College.find()
  // .then((result) => {
  //   res.render('collegelist', { colleges: result });
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.log(err);
  // }
  // );
  res.redirect('/colleges/:branch/:rank/:cat');
});

app.get('/colleges/:branch/:rank/:cat', async function(req, res) {
  const rank = parseInt(req.params.rank);
  const branch = req.params.branch;
  const cat = req.params.cat;

  // College.find({ 
  //   'cutOff.branch': branch,
  //   'cutOff.category' : cat, 
  //   'cutOff.lastRank': { $gt: rank }
  //  })
  // .then((result) => {
  //   res.render('collegelist', { colleges: result });
  //   console.log(result);
  // })
  // .catch((err) => {
  //   console.log(err);
  // }
  // );
  try {
    const colleges = await College
      .find({ 'cutOff.branch': branch,'cutOff.category' : cat, 'cutOff.lastRank': { $gt: rank } })
      .exec();
    console.log(rank);
    console.log(branch);
    console.log(cat);

    res.render('collegelist',{colleges:colleges});
  } catch (err) {
    console.error('Error retrieving colleges:', err);
    res.status(500).send('Error retrieving colleges');
  }
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
