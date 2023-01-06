import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './MovieDetails.css'
import { Link } from 'react-router-dom'

function ReviewDetails(props){
    const [movie, setMovie] = useState(null)
    const [editForm, setEditForm] = useState("")
    const [newReview, setNewReview] = useState([
        {
        rating:"",
        comment:"",
        title:"",
    }]

    )

    const navigate = useNavigate()

    const params = useParams()
    const { id } = params


    const URL = `https://movie-buff-backend.herokuapp.com/movie/${id}`
    const URL2 = `http://localhost:4000/review/${id}`
    const URL3 = `http://localhost:3000/review/${id}`
  

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
            console.log(foundReview)
            // setEditForm(foundMovie)

        } catch (err) {
            console.log(err)
        }
    }
    const removeReview = async () => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL2, options)
            console.log(URL2)
            const deletedReview = await response.json()
            console.log(deletedReview)
            navigate('/')
            console.log(URL3)
            
        } catch (err) {
            console.log(err)
            // navigate(URL3)
            // navigate(`/`)
        }
    }
    const handleChange = (e) => {
        console.log(newReview.reviews)
        const userInput = { ...newReview }
        userInput[e.target.name] = e.target.value
        setNewReview(userInput)
        console.log(userInput)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentState = { ...newReview }
        console.log(currentState)
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentState)

            }
            const response = await fetch(URL2, requestOptions)
            console.log(URL2)
            const createdReview = await response.json()
            console.log(createdReview)
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
        <>
            <section>
                <div className="movie">
                    {/* <h1>Movie Details Page</h1> */}
                    <h2>{movie.name}</h2>
                    <h2>{movie.title}</h2>
                    <img src={movie.image} alt={movie.name + " image"} height="200px" width="200px" />

                </div>
            </section>
            <div>
                <section>
                    <h2>Create a new Review</h2>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor='title'>
                                Rating
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    placeholder="write review here"
                                    value={newReview.rating}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor='title'>
                                Comment
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
                            <input type="submit" value="Post Review" />
                        </div>
                    </form>
                </section>
                {/* {movie && movie.length ? loaded() : loading()} */}
            </div >
            <div>
                {newReview.reviews ? (
                    newReview.reviews.map((review, index) => {
                        
                        return (
                            <div key={review._id} className='review-list'>
                                <div className='review'>
                                    <p>Rating: {review.rating}</p>
                                    <p>Review: {review.comment}</p>
                                    <button className="delete" onClick={removeReview}>Delete Review</button>
                                    <Link to={`/reviewdetails`} className='edit'>edit</Link>
                                </div>
                            </div>
                        )
                    })
                ) : (<p> No reviews for this product </p>)}
            </div>
        </>
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

export default ReviewDetails