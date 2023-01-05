import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/review/:id" element={<MovieDetails/>} />
        <Route path="/editreview/:id" element={<MovieDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
