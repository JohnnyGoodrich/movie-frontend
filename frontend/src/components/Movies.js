import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import '../styles/homepage.css'

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
for (let i=0; i<movies.length; i++) {
    movieTitleList.push(movies[0].title)
}
console.log(`movieTitleList: ${movieTitleList}`)

const loaded = () => {
    return (
        <>
            <section className="movie-list">
                {movies?.map((movie) =>{
                    return(
                        <Link key={movie._id} to={`/movie/${movie._id}`}>
                            <div className="movie-card">
                                <img src={movie.image} alt=""/>
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
        <Search movieList={movieTitleList} > </Search>
        <h1>LOGIN/SIGNUP</h1>
        </div>
        <h1>Scroll wheel</h1>
        <h1>Movies:</h1>
        {movies && movies.length ? loaded() :loading()}
        </>
    )
}

export default Movies