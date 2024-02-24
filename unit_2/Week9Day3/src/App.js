
import './App.css';
import { useState, useEffect } from 'react';
import Form from './components/Form';
import MovieDisplay from './components/MovieDisplay';

function App() {

  const apiKey ='e3cb7aac'

  const [movie,setMovie] = useState({});

  const getMovie = async(searchTerm) => {
    try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`)
    const data = await response.json()

    setMovie(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=> {
    const movies = ['I,Robot', 'Spirited Away', 'Eternal Sunshine of the Spotless Mind', 'The Knight Before Christmas','Home Alone']
    getMovie(movies[Math.floor(Math.random()* movies.length)])
  }, [])

  return (
    <div className="App">
     <Form moviesearch={getMovie}/>
     <MovieDisplay movie={movie}/>
    </div>
  );
}

export default App;
