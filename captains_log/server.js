
const express = require('express');
require('dotenv').config();
const React = require('react');
const app = express();
const mongoose = require('mongoose');
const Flight = require('./models/Flight.js');

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
    res.send('new');
})
//Create /logs/ POST none Log.create(req.body)

//Edit
//Update
//Destroy


app.listen(3000, () => {
    console.log('listening');
  });
  