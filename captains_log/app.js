const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const React = require('react');
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.error(error));

// Middleware
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(methodOverride('_method'));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Logging middleware
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

// Seed Route
const practiceLogs = [
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
];

app.get('/logs/seed', (req, res) => {
    Log.create(practiceLogs)
        .then(() => res.redirect('/logs'))
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

// Routes
const logRoutes = require('./routes/logRoutes');
app.use('/logs', logRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
