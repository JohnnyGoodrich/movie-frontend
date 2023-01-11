import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import './ReviewDetails.css'
import './MovieDetails.css'
import { Link } from 'react-router-dom'
import { getUserToken, decodeToken } from '../utils/authToken' 
import { UserContext } from '../data'

function ReviewDetails(props) {
    const loggedInUser = decodeToken(getUserToken())
    const token = getUserToken()
    const params = useParams()
    const { id } = params
    const [movie, setMovie] = useState(null)

    const [editForm, setEditForm] = useState({
        rating: "",
        comment: "",
        title: id,
    })
    const [reviews, setReviews] = useState(null)
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const URL = 'https://movie-backend-project3.herokuapp.com/movie'
    const URL4 = `https://movie-backend-project3.herokuapp.com/review/edit/${id}`

    const getReview = async () => {
        try {
            const response = await fetch(URL4)
            const foundReview = await response.json()
            setReviews(foundReview)
            setEditForm(foundReview)
        } catch (err) {
            console.log(err)
        }
    }
    const removeReview = async () => {
        try {
            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await fetch(URL4, options)
            const deletedReview = await response.json()
        } catch (err) {
            console.log(err)
            navigate(-1)
        }
    }
    const updateReview = async (e) => {
        e.preventDefault()
        const currentState = { ...reviews, ...editForm }
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState)
            }
            const response = await fetch(URL4, requestOptions)
            const updatedReview = await response.json()
            setReviews(updatedReview)
     
            navigate(-1)

        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }

    const handleChange = (e) => {
        const userInput = { ...editForm }
        userInput[e.target.name] = e.target.value
        setEditForm(userInput)
    }

    useEffect(() => {
        getReview()
    }, [])
    const isOwner = loggedInUser.id === reviews?.owner
    console.log(`token is : ${token}`)
    console.log(`Second condition is: ${loggedInUser.id === reviews?.owner}`)
    const loaded = () => (
        <div className='details-content'>
            <section>
                <div className='review-editor'>Review Editor</div>
                <div className='review-details-list'>
                    <div className='review-details'>
                        <h4>Rating: {reviews.rating}</h4>
                        <h4>{reviews.comment}</h4>
                    </div>
                </div>
            </section>
            <section>
                <div className='delete'>
                    {token && isOwner ? <button onClick={removeReview}>delete review</button> : null}
                </div>
                <form className='rating-form-2' onSubmit={(e) => { updateReview(e) }} >
                    <h2 className='section-header'>Edit this review</h2>
                    {token && isOwner ? <div className='create-review'>
                        <div className='text-box'>Rating</div>
                        <label htmlFor='title'>
                            <input
                                type="number"
                                value={editForm.rating}
                                className="rating"
                                name="rating"
                                placeholder="rating"
                                onChange={handleChange}
                            />
                        </label>
                        <div className='text-box'>Comment</div>
                        <input
                            type="text"
                            className="comment"
                            value={editForm.comment}
                            name="comment"
                            placeholder="comment"
                            onChange={handleChange}
                        />


                        <input type="submit" value="Update Review" />
                    </div> : null}
                </form>
            </section>
        </div>
    )
    const isLoading = () => (
        <>
            <h1>
                No review...
            </h1>
        </>
    );
    return (
        <div>{reviews ? loaded() : isLoading()}</div>
    )
}

export default ReviewDetails