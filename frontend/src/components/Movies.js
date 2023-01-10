import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHandPointRight } from "react-icons/fa";
import Search from './Search'
import Slider from './Slider'
import MovieSlider from './MovieSlider';
import '../styles/headerHomepage.css'
import logo from '../images/Screen Shot 2023-01-09 at 10.14.57 AM.png'
function Movies(props) {
    const [movies, setMovies] = useState([])
    // const BASE_URL = 'https://movie-buff-backend.herokuapp.com/movie'
    const BASE_URL = 'http://localhost:4000/movie'
    const getMovies = async () => {
        try {
            const response = await fetch(BASE_URL)
            const allMovies = await response.json()
            setMovies(allMovies)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getMovies()
    }, [])
    const movieTitleList = []
    const movieImageList = []
    const movieDescList= []
    const movieID = []
    for (let i = 0; i < movies.length; i++) {
        movieTitleList.push(movies[i].title)
        movieImageList.push(movies[i].image)
        movieDescList.push(movies[i].desc)
        movieID.push(movies[i]._id)
    }
    const loaded = () => {
        return (
            
            <div className='main-page'>
                <section className="movie-list">
                    {movies?.map((movie) => {
                        return (
                            <Link key={movie._id} to={`/review/${movie._id}`}>
                                <div className="movie-card">
                                    <img className="movie-images" src={movie.image} alt="" />
                                    <h1>{movie.title}</h1>
                                </div>
                            </Link>
                        )
                    })}
                </section>
            </div>
        )
    }
    const loading = () => (
        <section className="movie-list">
            <h1>Loading... <span>{" "} <img className='spinner' src="https://freesvg.org/img/1544764567.png" /></span></h1>
        </section>
    )
    return (
        <div className='main-page'>
            <div className='header-homepage'>
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <div className="homepage">
                        {/* <h1 id="movie-buff" >MovieBUFF</h1> */}
                        <Link to={`/`}>
                        <img src={logo} className='header-logo'></img>
                        {/* <h1 id="blank-symbol-header">...</h1> */}
                        </Link>
                    </div>
                </Link>
                <Search movieList={movieTitleList} />
                <h1 id="login-box">LOGIN/SIGNUP</h1>
            </div>
            <div className='content'>
                <Slider movieList={movieTitleList} movieImage={movieImageList} />
            </div>
            <h1 className='top-rated-movies'><span id="biwind"></span><a href="http://localhost:3000/viewAllTopRatedMovies" className="View-All" >All Movies</a></h1>
            <div className='bottom-half'>
            <div className="movies-slide-bar">
                <MovieSlider image={movieImageList} title={movieTitleList} desc={movieDescList} id={movieID} />
            </div>
            </div>
            {/* {movies && movies.length ? loaded() : loading()} */}
        </div>
    )
}
export default Movies
