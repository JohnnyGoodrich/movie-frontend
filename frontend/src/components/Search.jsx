import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"
import '../styles/search.css'

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('')
    const [movies, setMovies] = useState('')
    const BASE_URL = `https://movie-backend-project3.herokuapp.com/movie`

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
    const onChange = (event) => {
        setSearchValue(event.target.value)
    }
    const onSearch = (searchItem) => {
        setSearchValue(searchItem)
    }

    return (
        <div className="search-context">
            <div className="search-context-inner">
                <p id="look-up-symbol">{<BsSearch />}</p>
                <input type="text" value={searchValue} onChange={onChange} id="search" autoComplete="off" placeholder="Search movies titles....." />
                <Link to={`/details/${searchValue}`}>
                    <button onClick={() => <Link to={`/details/${searchValue}`}></Link>} id="search-submit">Search</button>
                </Link>
            </div>
            <div className="drop-down-list">
                {Object.values(movies).filter((movie) => {
                    const searchItem = searchValue.toLowerCase()
                    const movieTitle = movie.title.toLowerCase()
                    return (searchItem && movieTitle.startsWith(searchItem) && movieTitle !== searchItem)
                })
                    .slice(0, 8)
                    .map((movie, idx) => (
                        <div onClick={() => onSearch(movie)} className="drop-down-row" key={idx}>
                            <Link style={{ textDecoration: 'none' }} key={movie._id} to={`/review/${movie._id}`}>
                                <div className='drop-down-info'>
                                    <img id="search-image" style={{ borderRadius: '10px' }} src={movie.image} alt="" />
                                    <div>
                                        <div id="search-title" style={{ textDecoration: 'none' }}>{movie.title}</div>
                                        <p className='movie-info-search'><span className='age-rating'>{movie.agerating}</span>&nbsp; {movie.year}, {movie.hlength}h{movie.mlength}m</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Search