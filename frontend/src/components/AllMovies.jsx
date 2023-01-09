import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Search from "./Search"
import '../styles/allMovies.css'

function AllMovies(props) {
    const [movies, setMovies] = useState([])
    // const BASE_URL = 'https://movie-buff-backend.herokuapp.com/movie'
    const BASE_URL = 'http://localhost:4000/movie'//testing

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




    return (
        <>
            <div className='header-homepage'>
                <Link to={'/'} style={{ textDecoration: 'none' }}>
                    <div className="homepage">
                        <h1 id="movie-buff" >MovieBuff</h1>
                        <h1 id="blank-symbol-header">...</h1>
                    </div>
                </Link>
                <Search />
                <h1 id="login-box">LOGIN/SIGNUP</h1>
            </div>

            <div className="All-Movies">
            {movies.map((movie) => (
                <Link to={`/review/${movie._id}`} style={{ textDecoration: 'none' }} key={movie._id}>
                    <div className="card-movie">
                        <div className="card-image">
                            <img className="card-each-image"src={movie.image} alt={movie.title} />
                        </div>
                        <div className="card-title">
                            <h3>{movie.title}</h3>
                        </div>
                    </div>
                </Link>
            ))
            }
            </div>


        </>
    )
}

export default AllMovies