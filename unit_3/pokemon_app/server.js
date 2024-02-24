require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const app = express();
const Pokemon = require('./models/Pokemon');

app.set('view engine', 'jsx');
app.engine('jsx', require("express-react-views").createEngine());

mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection;
  mongoose.connection.once('open',() =>{
    console.log('connected to mongo!');
  })

db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("open", () => console.log("mongo connected: "));
db.on("close", () => console.log("mongo disconnected"));

const manyPokemons = [
    {name: "bulbasaur", img: "http://img.pokemondb.net/artwork/bulbasaur"},
    {name: "ivysaur", img: "http://img.pokemondb.net/artwork/ivysaur"},
    {name: "venusaur", img: "http://img.pokemondb.net/artwork/venusaur"},
    {name: "charmander", img: "http://img.pokemondb.net/artwork/charmander"},
    {name: "charizard", img: "http://img.pokemondb.net/artwork/charizard"},
    {name: "squirtle", img: "http://img.pokemondb.net/artwork/squirtle"},
    {name: "wartortle", img: "http://img.pokemondb.net/artwork/wartortle"}
 ];


// Pokemon.countDocuments()
// .then((pokemons) => {
//     console.log(pokemons)
// })
// .catch((error) => {
//     console.log(error)
// })
// .finally(()=>{
//     db.close()
// })

app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res) => {
    res.send('Welcome to the Pokemon App!')
})



app.get('/pokemon', (req, res) => {
    //find returns an array of objects
    Pokemon.find({})
        .then((allPokemons) => {
            res.render('Index', { pokemons: allPokemons });
        })
    .catch((err)=> console.error(err));
});

app.get('/pokemon/:id', (req, res) => {
    const { id } = req.params;

    Pokemon.findOne({ _id: id }).then((foundPokemon) => {
        // Check if the Pokemon is found
        if (!foundPokemon) {
            return res.status(404).send('Pokémon not found');
        }

        // Render the Show component with the foundPokemon data
        res.render('Show', { pokemon: foundPokemon });
    }).catch((err) => {
        console.error('Error fetching Pokemon:', err);
        res.status(500).send('Internal Server Error');
    });
});

app.listen(3000, () => {
    console.log('listening to PORT 3000');
});