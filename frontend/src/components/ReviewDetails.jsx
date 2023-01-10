import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import './ReviewDetails.css'
import './MovieDetails.css'
import { Link } from 'react-router-dom'
import { getUserToken, decodeToken } from '../utils/authToken'//Triet 
import { UserContext } from '../data'

function ReviewDetails(props) {
    const loggedInUser = decodeToken(getUserToken())//new stuff to make user still able to update or delete when refreshing the page
    // console.log(loggedInUser)
    const token = getUserToken()//Triet
    const params = useParams()
    const { id } = params
    const [movie, setMovie] = useState(null)
    // const [editForm, setEditForm] = useState("")
    const [editForm, setEditForm] = useState({
        rating: "",
        comment: "",
        title: id,
    })
    const [reviews, setReviews] = useState(null)
    // const [newReview, setNewReview] = useState(
    //     [
    //         {
    //             rating: "",
    //             comment: "",
    //             title: "",
    //         }]

    // )

    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)


    // const URL = `https://movie-buff-backend.herokuapp.com/movie/${id}`
    const URL = 'https://movie-backend-project3.herokuapp.com/movie'//testing



    // const URL2 = `https://movie-buff-backend.herokuapp.com/review/${id}` John
    const URL2 = `https://movie-backend-project3.herokuapp.com/review/${id}`//Triet's stuff

    // const URL3 = `http://localhost:3000/review/${id}` John
    const URL3 = `https://movie-backend-project3.herokuapp.com/review/${id}` // Triet's stuff


    // const URL4 = `https://movie-buff-backend.herokuapp.com/review/edit/${id}`

    const URL4 = `https://movie-backend-project3.herokuapp.com/review/edit/${id}`//Triet's stuff

    // console.log("id", id, URL)
    // console.log(`Current Person: ${JSON.stringify(movie)}`)

    // const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })



    const getReview = async () => {
        try {

            const response = await fetch(URL4)
            const foundReview = await response.json()
            setReviews(foundReview)
            // setMovie(foundReview)
            // console.log(foundReview)
            setEditForm(foundReview)
            // console.log(URL4)

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
                }//whole headers is created by Triet
            }
            // console.log(URL2.reviews)
            const response = await fetch(URL4, options)
            // console.log(URL2.reviews)
            const deletedReview = await response.json()
            // navigate('/')
            // navigate(URL2)
            // console.log(URL3)
        } catch (err) {
            console.log(err)
            navigate(-1)
            
        }
    }
    const updateReview = async (e) => {
        e.preventDefault()
        const currentState = { ...reviews, ...editForm }
        // console.log(currentState)
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
            // setEditForm(updatedReview)
            navigate(-1)

        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    // const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

    const handleChange = (e) => {
        // console.log(newReview.reviews._id)
        const userInput = { ...editForm }
        userInput[e.target.name] = e.target.value
        setEditForm(userInput)
        // console.log(userInput)
        // console.log(URL2)
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const currentState = { ...editForm }
    //     // console.log(currentState)
    //     // console.log(newReview.reviews[0]._id)
    //     try {
    //         const requestOptions = {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`//Triet's stuff
    //             },
    //             body: JSON.stringify(currentState)

    //         }
    //         const response = await fetch(URL2, requestOptions)
    //         // console.log(URL2)
    //         const createdReview = await response.json()
    //         // console.log(createdReview)
    //         setReviews([...reviews, createdReview])
    //         setEditForm([{
    //             rating: "",
    //             comment: "",
    //         }])

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }


    useEffect(() => {
        //    removeReview()
        getReview()
    }, [])
    // const isOwner = currentUser?._id === reviews?.owner OLD VERSION
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
            {/* onSubmit={updateReview} */}
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
                        {/* <div className='button'>
                            <button type="submit" value="Update Person">update review</button>
                        </div> */}
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