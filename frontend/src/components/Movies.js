import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHandPointRight } from "react-icons/fa";
import Search from './Search'
import Slider from './Slider'
import MovieSlider from './MovieSlider';
import '../styles/headerHomepage.css'
import logo from '../images/Screen Shot 2023-01-09 at 10.14.57 AM.png'
import { getUserToken } from '../utils/authToken'//Triet's stuff
function Movies(props) {
    const token = getUserToken() //Triet's stuff
    const [movies, setMovies] = useState([])
    // const BASE_URL = 'https://movie-buff-backend.herokuapp.com/movie'
    const BASE_URL = 'https://movie-backend-project3.herokuapp.com/movie'
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
                {token ? <img src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2960&q=80" id="avatar-image" />:<a id="login-box" href="/auth">LOGIN|SIGN-UP</a>}
                {/* <h1 id="login-box">LOGIN/SIGNUP</h1> */}
            </div>
            <div className='content'>
                <Slider movieList={movieTitleList} movieImage={movieImageList} />
            </div>
            <Link style={{textDecoration:"none"}} to="/viewAllTopRatedMovies">
            <h1 className='top-rated-movies'><div  className="View-All" textDecoration="none">All Movies</div></h1>
            </Link>
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
