import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './MovieDetails.css'
import { Link } from 'react-router-dom'

function MovieDetails(props) {
    const [movie, setMovie] = useState(null)
    const [editForm, setEditForm] = useState("")
    const [newReview, setNewReview] = useState([
        {
            rating: "",
            comment: "",
            title: "",
        }]

    )

    const navigate = useNavigate()

    const params = useParams()
    const { id } = params


    const URL = `https://movie-buff-backend.herokuapp.com/movie/${id}`
    const URL2 = `http://localhost:4000/review/${id}`
    const URL3 = `http://localhost:3000/review/${id}`
    const URL4 = `http://localhost:3000/review/${id}/edit`


    // console.log("id", id, URL)
    // console.log(`Current Person: ${JSON.stringify(movie)}`)

    // const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

    const getMovie = async () => {
        try {

            const response = await fetch(URL)
            const foundMovie = await response.json()

            setMovie(foundMovie)
            // console.log(foundMovie)
            // setEditForm(foundMovie)

        } catch (err) {
            console.log(err)
        }
    }

    const getReview = async () => {
        try {

            const response = await fetch(URL2)
            const foundReview = await response.json()
            // console.log(response.json)
            setNewReview(foundReview)
            // console.log(foundReview)
            // setEditForm(foundMovie)
            // console.log(newReview.reviews[0]._id)

        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        // console.log(newReview.reviews._id)
        const userInput = { ...newReview }
        userInput[e.target.name] = e.target.value
        setNewReview(userInput)
        // console.log(userInput)
        // console.log(URL2)
    }
    const handleSubmit = async (e) => {
        // e.preventDefault()
        const currentState = { ...newReview }
        // console.log(currentState)
        // console.log(newReview.reviews[0]._id)
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentState)

            }
            const response = await fetch(URL2, requestOptions)
            // console.log(URL2)
            const createdReview = await response.json()
            // console.log(createdReview)
            setNewReview([...newReview, createdReview])
            setNewReview([{
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
    useEffect(() => {

        getReview()
    }, [])

    const loaded = () => (
        <div className='details-content'>
            <section className='movie-details-1'>
                <div className="movie">
                    <div>
                        {/* <h2>{movie.title}</h2> */}
                        <img className='movie-details-image' src={movie.image} alt={movie.name + " image"} height="400px" width="400px" />
                        <p className='movie-info'><span className='age-rating'>{movie.agerating}</span>&nbsp; {movie.year}, {movie.hlength}h{movie.mlength}m</p>
                    </div>
                    <div className='cast'>
                        <h4 className='section-header'>Cast:</h4>
                        <p>{movie.cast[0]}</p>
                        <p>{movie.cast[1]}</p>
                        <p>{movie.cast[2]}</p>
                        <p>{movie.cast[3]}</p>
                        <p>{movie.cast[4]}</p>
                    </div>
                </div>
            </section>
                <div className='movie-description'>
                    <h4 className='section-header'>Movie Description</h4>
                    <p>{movie.desc}</p>
                </div>
            <div className='bottom-half'>
                <div  >
                    <section>
                        <form className='rating-form' onSubmit={handleSubmit}>
                            <h4 className='section-header'>Create a new Review</h4>

                            <div className='create-review'>
                                <div>Rating</div>
                                <label htmlFor='title'>
                                    <input
                                        type="number"
                                        id="rating"
                                        name="rating"
                                        placeholder="rating"
                                        value={newReview.rating}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className='comment-label' htmlFor='title'>
                                    <div>Comment</div>
                                    <input
                                        type="text"
                                        id="comment"
                                        name="comment"
                                        placeholder="write review here"
                                        value={newReview.comment}
                                        onChange={handleChange}
                                    />
                                </label>

                                <br />
                                <div className='button'>
                                    <button type="submit" value="Post Review">Post Review</button>
                                </div>
                            </div>
                        </form>
                    </section>
                </div >

                <h4 className='review-header'>Reviews:</h4>
                <div className='all-reviews'>
                    {newReview.reviews ? (
                        newReview.reviews.map((review, index) => {

                            return (
                                <div key={review._id} className='review-list'>
                                    <div className='review'>
                                        <p className='rating-number'>Rating: {review.rating}</p>
                                        <p className='review-comment'>"{review.comment}"</p>
                                        {/* <button className="delete" onClick={removeReview}>Delete Review</button> */}
                                        <Link to={`/review/edit/${review._id}`} className='edit'>edit</Link>
                                    </div>
                                </div>
                            )
                        })
                    ) : (<p> No reviews for this product </p>)}
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
        <div>{movie && newReview ? loaded() : loading()}</div>
    )
}

export default MovieDetails