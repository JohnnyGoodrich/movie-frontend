import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"
import '../styles/search.css'

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('')
    const [movies, setMovies] = useState('')
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

    



    //this function handle to get user's information whey they are typing
    const onChange = (event) => {
        setSearchValue(event.target.value)
    }

    // this function to handle submit user's information
    const onSearch = (searchItem) => {
        setSearchValue(searchItem)
    }

    return (
        <div className="search-context">

            {/* search-context-inner class is a form for user to type */}
            <div className="search-context-inner">
                <Link to={`/details/${searchValue}`}>
                    <button onClick={<Link to={`/details/${searchValue}`}></Link>} id="search">{<BsSearch/>} </button>
                </Link>
                <input type="text" value={searchValue} onChange={onChange} id="search" placeholder="Search movies titles" />
            </div>

            {/* This filters through the search results to suggest movie titles completion for the user dynamically as they type. */}
            {/* props.movieList.fliter */}

            <div className="drop-down-list">
                {props.movieList.filter((movie) => {
                    const searchItem = searchValue.toLowerCase()
                    const movieTitle = movie.toLowerCase()
                    return (searchItem && movieTitle.startsWith(searchItem) && movieTitle !== searchItem)
                })
                    .slice(0, 8)
                    .map((movie, idx) => (
                        <div onClick={() => onSearch(movie)} className="drop-down-row" key={idx}>
                            {movie}
                            </div>
                    ))
                }
                

            </div>
        </div>
    )

}

export default Search