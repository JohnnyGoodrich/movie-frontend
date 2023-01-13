import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaRegHandPointRight } from "react-icons/fa";
import Search from './Search'
import Slider from './Slider'
import MovieSlider from './MovieSlider';
import '../styles/headerHomepage.css'
import logo from '../images/Screen Shot 2023-01-09 at 10.14.57 AM.png'
// import { getUserToken } from '../utils/authToken'
import { getUserToken, setUserToken, clearUserToken, decodeToken } from "../utils/authToken"
function Movies(props) {
    const navigate = useNavigate()
    const token = getUserToken()
    const [movies, setMovies] = useState([])
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
    const movieDescList = []
    const movieID = []
    for (let i = 0; i < movies.length; i++) {
        movieTitleList.push(movies[i].title)
        movieImageList.push(movies[i].image)
        movieDescList.push(movies[i].desc)
        movieID.push(movies[i]._id)
    }
    function logout() {
        clearUserToken();
        navigate('/')
    }

    return (
        <div className='main-page'>
            <div className='header-homepage'>
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <div className="homepage">
                        <Link to={`/`}>
                            <img src={logo} className='header-logo'></img>
                        </Link>
                    </div>
                </Link>
                <Search movieList={movieTitleList} />
                {token ?
                    <div className='avatar-logout-button'>
                        <img src="https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2960&q=80" id="avatar-image" />
                        <div className='button-box'>
                            <button type="button" onClick={logout} className='btn btn-outline-warning'>Logout</button>
                        </div>
                    </div> : <a id="login-box" href="/auth">LOGIN|SIGN-UP</a>}
            </div>
            <div className='content'>
                <Slider movieList={movieTitleList} movieImage={movieImageList} />
            </div>
            <Link style={{ textDecoration: "none" }} to="/viewAllTopRatedMovies">
                <h1 className='top-rated-movies'><div className="View-All" textDecoration="none">All Movies</div></h1>
            </Link>
            <div className='bottom-half'>
                <div className="movies-slide-bar">
                    <MovieSlider image={movieImageList} title={movieTitleList} desc={movieDescList} id={movieID} />
                </div>
            </div>
        </div>
    )
}
export default Movies
