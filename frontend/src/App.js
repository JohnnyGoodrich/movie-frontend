import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import ReviewDetails from './components/ReviewDetails';
import AllMovies from './components/AllMovies'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/viewAllTopRatedMovies" element ={<AllMovies />}/>
        <Route path="/review/:id" element={<MovieDetails/>} />
        <Route path="/review/edit/:id" element={<ReviewDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
