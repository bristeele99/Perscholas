const express = require('express');
const app = express ();

const magic = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely","You may rely on it", "As I see it yes", "Most likely", "Outlook good","Yes", "Signs point to yes", "Reply hazy try again", "Ask again later","Better not tell you now", "Cannot predict now", "Concentrate and ask again","Don't count on it", "My reply is no", "My sources say no","Outlook not so good", "Very doubtful"]


// const fruits = [
//     {
//         name:'apple',
//         color: 'red',
//         readyToEat: true
//     },
//     {
//         name:'pear',
//         color: 'green',
//         readyToEat: false
//     },
//     {
//         name:'banana',
//         color: 'yellow',
//         readyToEat: true
//     }
// ];

app.get('/greeting/:name', function(req,res){
    console.log(req.params);
    console.log(req.query);
    res.send('Wow!'+ " " + req.query.title + " " + req.params.name + "!" + " It's good to see you!");
});

app.get('/tip/:total/:tipPercentage', function (req,res){
    console.log(req.params);
    console.log(req.query);
    const tipAmount = parseFloat(req.params.total * (.01*(req.params.tipPercentage)));
    res.send(`Tip amount: ${tipAmount}`);
});

app.get('/magic/', function (req, res) {
     res.send(`<h1>${req.query.question}?</h1> <h1>${magic[Math.floor(Math.random() * magic.length)]}!</h1>`);
});
// app.get('/fruits/', (req, res) => {
//     res.send(fruits);
// });

// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//     res.send(fruits[req.params.indexOfFruitsArray]);
// });



app.listen(3000, () => {
    console.log('listening');
});