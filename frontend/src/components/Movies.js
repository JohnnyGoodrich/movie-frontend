import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
function Movies(props) {
const [movies, setMovies] = useState([])

const BASE_URL = 'http://localhost:4000/movies'

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

const loaded = () => {
    return (
        <>
            <section className="movie-list">
                {movies?.map((movie) =>{
                    return(
                        <Link key={movie._id} to={`/movie/${movie._id}`}>
                            <div className="movie-card">
                                <h1>movie name</h1>
                                <img>image</img>
                                <h3>movie title</h3>
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
        {movies && movies.length ? loaded() :loading()}
        </>
    )
}

export default Movies