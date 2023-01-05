import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { FaRegHandPointRight } from "react-icons/fa";
import Search from './Search'
import Slider from './Slider'
import '../styles/headerHomepage.css'


function Movies(props) {
const [movies, setMovies] = useState([])
const BASE_URL = 'https://movie-buff-backend.herokuapp.com/movie'

const getMovies = async () => {
    try {
        const response = await fetch(BASE_URL)
        const allMovies = await response.json()
        setMovies(allMovies)
    } catch (err){
        console.log(err)
    }
}

useEffect(() => {
    getMovies()
}, [])

const movieTitleList = []
const movieImageList = []
for (let i=0; i<movies.length; i++) {
    movieTitleList.push(movies[i].title)
    movieImageList.push(movies[i].image)
}

const loaded = () => {
    return (
        <>
            <section className="movie-list">
                {movies?.map((movie) =>{
                    return(
                        <Link key={movie._id} to={`/review/${movie._id}`}>
                            <div className="movie-card">
                                <img className="movie-images" src={movie.image} alt=""/>
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
        <h1>Loading... <span>{" "} <img className='spinner' src="https://freesvg.org/img/1544764567.png"/></span></h1>
    </section>
)
    return (
        <>
        <div className='header-homepage'>
        <h1>MovieBuff</h1>
        <Search movieList={movieTitleList}/>
        <h1>LOGIN/SIGNUP</h1>
        </div>
        <div>
        <Slider movieList={movieTitleList} movieImage={movieImageList}/>
        </div>
        <h1><span id="biwind">{<FaRegHandPointRight />}</span>MOVIES</h1>
        {movies && movies.length ? loaded() :loading()}
        </>
    )
}

export default Movies