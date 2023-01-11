import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './MovieDetails.css'
import { Link } from 'react-router-dom'
import { getUserToken } from '../utils/authToken'
import logo from '../images/Screen Shot 2023-01-09 at 10.14.57 AM.png'

function MovieDetails(props) {
    const token = getUserToken()
    const params = useParams()
    const { id } = params
    const [reviewAverage, setReviewAverage] = useState(null)
    const [movie, setMovie] = useState(null)
    const [editForm, setEditForm] = useState({
        rating: "",
        comment: "",
        title: id,
    })
    const [reviews, setReviews] = useState([])

    const BASE_URL = `https://movie-backend-project3.herokuapp.com/movie/${id}`
    const URL2 = `https://movie-backend-project3.herokuapp.com/review/${id}`
    const URL3 = `https://movie-backend-project3.herokuapp.com/review/${id}`
    const URL4 = `https://movie-backend-project3.herokuapp.com/review/edit/${id}`

    const getMovie = async () => {
        try {

            const response = await fetch(URL2)
            const foundMovie = await response.json()
            setMovie(foundMovie.title)
            setReviews(foundMovie.reviews)
        } catch (err) {
            console.log(err)
        }
    }

    let averageRating = 0
    async function average() {
        const array = []
        let sum = 0
        try {
            for (let i = 0; i < reviews.length; i++) {
                array.push(reviews[i].rating)
                sum += array[i]
                averageRating = sum / array.length
            }
        } catch (err) {
            console.log(err)
        }
    }
    average()

    const handleChange = (e) => {
        const userInput = { ...editForm }
        userInput[e.target.name] = e.target.value
        setEditForm(userInput)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentState = { ...editForm }

        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState)

            }
            const response = await fetch(URL2, requestOptions)
            const createdReview = await response.json()
            setReviews([...reviews, createdReview])
            setEditForm([{
                rating: "",
                comment: "",
            }])
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMovie()
    }, [])

    let items = document.querySelectorAll('.progress-item');
    const counters = Array(items.length);
    const intervals = Array(items.length);
    counters.fill(0);
    items.forEach((number, index) => {
        intervals[index] = setInterval(() => {
            if (counters[index] == parseInt(number.dataset.num)) {
                clearInterval(intervals[index]);
            } else {
                counters[index] += 1;
                number.style.background = "conic-gradient(red calc(" + counters[index] + "%), gray 0deg)";
                number.setAttribute('data-value', counters[index] + "%");
                number.innerHTML = counters[index] + "%";
            }
        }, 15);
    });

    const loaded = () => (
        <div className='details-content'>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <div className="header-homepage">
                    <Link to={`/`}>
                        <img src={logo} className='header-logo'></img>
                    </Link>
                </div>
            </Link>

            <section className='movie-details-1'>
                <div className="movie">
                    <div>
                        <img className='movie-details-image' src={movie.image} alt={movie.name + " image"} height="400px" width="400px" />
                        <p className='movie-info'><span className='age-rating'>{movie.agerating}</span>&nbsp; {movie.year}, {movie.hlength}h{movie.mlength}m</p>
                    </div>
                    <div className='container1'>
                        <div id="progress" >
                            <div data-num={averageRating} className="progress-item">ds</div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='movie-description'>
                <h2 className='section-header'>Movie Description</h2>
                <p>{movie.desc}</p>
            </div>
            <div className='cast'>

                <h2 className='section-header'>Director:</h2>
                <p>{movie.director}</p>
                <h2 className='section-header'>Cast:</h2>
                <div className='cast-list'>
                    <p>{movie.cast[0]}</p>
                    <p>{movie.cast[1]}</p>
                    <p>{movie.cast[2]}</p>
                    <p>{movie.cast[3]}</p>
                    <p>{movie.cast[4]}</p>
                </div>
            </div>

            <div className='bottom-half'>
                <div  >
                    {token ? <section>
                        <form className='rating-form' onSubmit={handleSubmit}>
                            <h2 className='section-header'>Create a new Review</h2>
                            <div className='create-review'>
                                <div>Rating</div>
                                <label htmlFor='title'>
                                    <input
                                        type="number"
                                        className="rating"
                                        name="rating"
                                        placeholder="1-100"
                                        min="1"
                                        max="100"
                                        autoComplete='off'
                                        value={editForm.rating}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className='comment-label' htmlFor='title'>
                                    <div>Comment</div>
                                    <input
                                        type="text"
                                        className="comment"
                                        name="comment"
                                        placeholder="write review here"
                                        autoComplete='off'
                                        value={editForm.comment}
                                        onChange={handleChange}
                                    />
                                </label>

                                <br />
                                <div className='button'>
                                    <button type="submit" value="Post Review">Post Review</button>
                                </div>
                            </div>
                        </form>
                    </section> : null}
                </div >
                <h2 className='review-header'>Reviews:</h2>
                <div className='all-reviews'>
                    {token ?
                        <div className='review-list'>
                            {reviews ? (
                                reviews.map((review, index) => {
                                    return (
                                        <div key={review._id} className='review-list'>
                                            <Link to={`/review/edit/${review._id}`} className='edit'>
                                                <div className='review'>

                                                    <p data-num="" className='rating-number'>Rating: {review.rating}</p>
                                                    <p className='review-comment'>"{review.comment}"</p>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            ) : (<p> No reviews for this product </p>)}
                        </div> :
                        <div className='review-list'>
                            {reviews ? (
                                reviews.map((review, index) => {
                                    return (
                                        <div key={review._id} className='review-list'>
                                            <div  className='edit'>
                                                <div className='review'>

                                                    <p data-num="" className='rating-number'>Rating: {review.rating}</p>
                                                    <p className='review-comment'>"{review.comment}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (<p> No reviews for this product </p>)}
                        </div>}

                </div>
            </div>
        </div>
    )
    const loading = () => (
        <>
            <h1>
                Loading...
            </h1>
        </>
    );
    return (
        <div>
            {movie && reviews ? loaded() : loading()}

        </div>
    )
}

export default MovieDetails