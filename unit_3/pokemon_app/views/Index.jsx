
const React = require('react');


const myStyle = {
    color: '#ffffff',
    backgroundColor: '#000000',
    textTransform: 'capitalize',
    };


class Index extends React.Component {
  render() {
    
    const { pokemons } = this.props;
      console.log('pokemons:', pokemons);
         // Check if "pokemons" is undefined or an empty array
    if (!pokemons || pokemons.length === 0) {
return <div>No Pokémon available.</div>;}
return (
<div>
    <h1 style={myStyle}>See All The Pokemon</h1>
<ul>
    {pokemons.map((pokemonEl, i) => {
        return (
            <li key={pokemonEl._id}>
                <a href={`/pokemon/${pokemonEl._id}`}>{pokemonEl.name.charAt(0).toUpperCase() + pokemonEl.name.slice(1)} </a>: {pokemonEl.img} <br />
            </li>
             );
        })}
    </ul> 
</div>
    );
  }
}
module.exports = Index;
