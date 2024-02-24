const express = require('express');
const app = express();

app.get('/home/', function (req, res) {
    res.send('<h1>99 Bottles of Tej on the wall</h1>' +
             '<a href="http://localhost:3000/home/98">Take one down, pass it around</a>');
});

app.get('/home/:number_of_bottles', function (req, res) {
    const numberOfBottles = parseInt(req.params.number_of_bottles);

    const aroundLink = numberOfBottles - 1;
    res.send(`<h1>${numberOfBottles} Bottles of Tej on the wall</h1>` +
             `<a href="http://localhost:3000/home/${aroundLink}">Take one down, pass it around</a>`);
});

app.listen(3000, () => {
    console.log('listening');
});
