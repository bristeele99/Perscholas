
const React = require('react');


const myStyle = {
    color: '#ffffff',
    backgroundColor: '#000000',
    textTransform: 'capitalize',
    };



class Show extends React.Component {
  render() {
    const { pokemon } = this.props;
      console.log('pokemon:', pokemon);
         // Check if "pokemons" is undefined or an empty array
    if (!pokemon || pokemon.length === 0) {
        return <div>No Pokémon available.</div>;
      }
      return (
              <div>
                  <h1 style={myStyle}>Gotta Catch 'Em All</h1>
                  <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} </h2>
                  <img src={pokemon.img + '.jpg'} alt={pokemon.name}/><br/>
                  <a href='/pokemon'>back</a>
              </div>
      );
  }
}
module.exports = Show;
