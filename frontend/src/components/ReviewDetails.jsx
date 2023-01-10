import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './ReviewDetails.css'
import './MovieDetails.css'
import { Link } from 'react-router-dom'

function ReviewDetails(props) {
    const [movie, setMovie] = useState(null)
    const [editForm, setEditForm] = useState("")
    const [newReview, setNewReview] = useState(
        [
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
    const URL2 = `https://movie-buff-backend.herokuapp.com/review/${id}`
    const URL3 = `http://localhost:3000/review/${id}`
    const URL4 = `https://movie-buff-backend.herokuapp.com/review/edit/${id}`
  

    // console.log("id", id, URL)
    // console.log(`Current Person: ${JSON.stringify(movie)}`)

    // const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })



    const getReview = async () => {
        try {

            const response = await fetch(URL4)
            const foundReview = await response.json()
            // console.log(response.json)
            setNewReview(foundReview)
            setMovie(foundReview)
            // console.log(foundReview)
            // setEditForm(foundMovie)
            console.log(URL4)

        } catch (err) {
            console.log(err)
        }
    }
    const removeReview = async () => {
        try {
            const options = {
                method: "DELETE"
            }
            // console.log(URL2.reviews)
            const response = await fetch(URL4, options)
            // console.log(URL2.reviews)
            const deletedReview = await response.json()
            console.log(deletedReview)
            // navigate(URL2)
            // console.log(URL3)
            // navigate(-1)
            
        } catch (err) {
            console.log(err)
            navigate(-1)
            
        }
    }
    const updateReview = async (e) => {
        e.preventDefault()
        // console.log(editForm)
        try {
            const options = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReview)
            }
            const response = await fetch(URL4, options)
            const updatedReview = await response.json()

            setNewReview(updatedReview)
            // setEditForm(updatedReview)
            navigate(-1)

        } catch (err) {
            console.log(err)
            navigate(-1)
        }
    }
    // const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })
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
    //    removeReview()
        getReview()
    }, [])

    const loaded = () => (
        <div className='details-content'>
            <section>
                <div className='review-editor'>Review Editor</div>
                <div className='review-details-list'>
                    <div className='review-details'>
                        <h4>Rating: {newReview.rating}</h4>
                        <h4>{newReview.comment}</h4>   
                    </div>
                </div>
            </section>
            <section>
                <form className='rating-form-2'onSubmit={updateReview}>
                <div className='delete'>
                    <button onClick={removeReview}>delete review</button>
                </div>
                <h2 className='section-header'>Edit this review</h2>
                <div className='create-review'>
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
                    <div className='button'>
                    <button type="submit" value="Update Person">update review</button>
                    </div>
                    </div>
                </form> 
            </section>
        </div>
    )
    const loading = () => (
        <>
            <h1>
                No review...
            </h1>
        </>
    );
    return (
        <div>{ newReview ? loaded() : loading()}</div>
    )
}

export default ReviewDetails