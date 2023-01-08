import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHandPointRight } from "react-icons/fa";
import Search from './Search'
import Slider from './Slider'
import MovieSlider from './MovieSlider';
import '../styles/headerHomepage.css'


function Movies(props) {
    const [movies, setMovies] = useState([])
    const BASE_URL = 'https://movie-buff-backend.herokuapp.com/movie'

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

    console.log(movies[0])

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
            <>
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
            </>
        )
    }

    const loading = () => (
        <section className="movie-list">
            <h1>Loading... <span>{" "} <img className='spinner' src="https://freesvg.org/img/1544764567.png" /></span></h1>
        </section>
    )
    return (
        <>
            <div className='header-homepage'>
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <div className="homepage">
                        <h1 id="movie-buff" >MovieBuff</h1>
                        <h1 id="blank-symbol-header">...</h1>
                    </div>

                </Link>
                <Search movieList={movieTitleList} />
                <h1 id="login-box">LOGIN/SIGNUP</h1>
            </div>
            <div className='content'>
                <Slider movieList={movieTitleList} movieImage={movieImageList} />
            </div>
            <h1 className='Top-Rated-Movies'><span id="biwind">{<FaRegHandPointRight />}</span>TOP RATED MOVIES <a href="http://localhost:3000/viewAllTopRatedMovies" className="View-All" >View All</a></h1>
            <div className="movies-slide-bar">
                <MovieSlider image={movieImageList} title={movieTitleList} desc={movieDescList} id={movieID} />
            </div>

            {movies && movies.length ? loaded() : loading()}
        </>
    )
}

export default Movies
