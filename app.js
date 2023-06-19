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
app.get('/about-us', (req, res) => {
    res.render('about-us');
});
app.get('/mainpage', (req, res) => {
  res.render('mainpage');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// app.get('/collegelist', (req, res) => {
//   // res.render('collegelist');
//   // College.find()
//   // .then((result) => {
//   //   res.render('collegelist', { colleges: result });
//   //   console.log(result);
//   // })
//   // .catch((err) => {
//   //   console.log(err);
//   // }
//   // );
//   res.redirect('/colleges/:branch/:rank/:cat');
// });

app.get('/collegelist', async function(req, res) {
  const rank = parseInt(req.query.rank) ;
  const cat = req.query.category;
  const branch = req.query.course;
  const location = req.query.location;
  let placement = {}
  if( req.query.placement != undefined) {
    placement= parseInt(req.query.placement) }
    else{
      placement = -1;
    } 
  let colleges = {};
  console.log(rank);
  console.log(cat);
  console.log(branch);
  console.log(location);
  console.log(placement);
  try {
    if (location != undefined && placement != -1){
      colleges = await College
      .find({ $or :[{ 
        'cutOff.branch': { $in: branch},
        'cutOff.category' : cat,
        'cutOff.lastRank': { $gt: rank },
        'location': { $in : location},
        'placed': { $lt : placement}
      }
    ]})
      .sort({'ranking' : 1})
      .exec();
    }
    else{
      if(location != undefined && placement == -1)
      {colleges = await College
      .find({ $or :[{
        'cutOff.branch': { $in: branch},
        'cutOff.category' : cat,
        'cutOff.lastRank': { $gt: rank },
        'location': { $in : location},
      }
    
    ]})
      .sort({'ranking' : 1})
      .exec();
    }

    if(placement != -1 && location == undefined){
      {colleges = await College
      .find({ $or :[{
        'cutOff.branch': { $in: branch},
        'cutOff.category' : cat,
        'cutOff.lastRank': { $gt: rank },
        'placed': { $lt : placement}
      }
    
    ]})
      .sort({'ranking' : 1})
      .exec();
    }

    }

    if(placement == -1 && location == undefined){
      {colleges = await College
      .find({ $or :[{
        'cutOff.branch': { $in: branch},
        'cutOff.category' : cat,
        'cutOff.lastRank': { $gt: rank },
      }
    
    ]})
      .sort({'ranking' : 1})
      .exec();
    }
  }
}
   

    res.render('collegelist',{colleges,branches : branch});
    console.log(colleges);
    
  } catch (err) {
    console.error('Error retrieving colleges:', err);
    res.status(500).send('Error retrieving colleges');
  }
});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });
