
const express = require('express');
require('dotenv').config();
const React = require('react');
const app = express();
const mongoose = require('mongoose');
const Log = require('./models/Log.js');

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);


mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.error(error));


app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  console.log('I run for all routes');
  next();
});

// Seed Route
app.get('/logs/seed', (req, res) => {
    Log.create([
      {
        title: '2nd Day',
        entry: 'Patched Hole',
        shipIsBroken: true
      },
      {
        title: '2nd Week',
        entry: 'Nothing to Report',
        shipIsBroken: false
      },
      {
        title: '3rd Week',
        entry: 'Damage Taken',
        shipIsBroken: true
      }
    ])
      .then(createdLogs => res.redirect('/logs'))
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });

//Index

app.get('/logs/', (req,res) => {
    Log.find({})
    .then((allLogs) => {
        res.render('logs/Index', { logs: allLogs});
    })
    .catch((err) => console.error(err));
})

//Show

//New  /logs/new GET New.jsx none
app.get('/logs/new', (req, res) => {
    res.render('new');
})
//Create /logs/ POST none Log.create(req.body)
app.post('/logs/', (req,res) =>{
    if(req.body.shipIsBroken === 'on') {
        req.body.shipIsBroken = true;
    }else {
        req.body.shipIsBroken =false;
    }
    Log.create(req.body)
    .then((createdLog) =>{
        res.redirect('Show')
    })
    .catch((err) => console.error(err));
});
//Edit
//Update
//Destroy


app.listen(3000, () => {
    console.log('listening');
  });
  