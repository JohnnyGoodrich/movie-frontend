import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MovieDetails(props) {
    const [movie, setMovie] = useState(null)
    const [editForm, setEditForm] = useState("")
    const [newReview, setNewReview] = useState([])

    const navigate = useNavigate()

    const params = useParams()
    const { id } = params

    const URL = `https://movie-buff-backend.herokuapp.com/movie/${id}`
    const URL2 = `https://movie-buff-backend.herokuapp.com/review/${id}`

    // console.log("id", id, URL)
    // console.log(`Current Person: ${JSON.stringify(movie)}`)

    const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

    const getMovie = async () => {
        try {

            const response = await fetch(URL)
            const foundPerson = await response.json()

            setMovie(foundPerson)
            setEditForm(foundPerson)

        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentState = { ...newReview }
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
            setNewReview([...movie, createdReview])
            setNewReview({
                name: "",
                image: "",
                title: "",
            })

        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getMovie()
    }, [])

    const loaded = () => (
        <>
            <section>
                <div className="movie">
                    <h1>Movie Details Page</h1>
                    <h2>{movie.name}</h2>
                    <h2>{movie.title}</h2>
                    <img src={movie.image} alt={movie.name + " image"} height="200px" width="200px" />
                   
                </div>
            </section>

            {/* <section>
                <h2>Write a Review:</h2>
                <form onSubmit={updatePerson}>
                    <input
                        type="text"
                        value={editForm.name}
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                    />
               
                    <input
                        type="text"
                        value={editForm.title}
                        name="title"
                        placeholder="title"
                        onChange={handleChange}
                    />
                    <input type="submit" value="Update Person" />
                </form> 
            </section> */}
            <div>
                <section>
                    <h2>Create a new Review</h2>
                    <form onSubmit={handleSubmit}>
  
                        <div>
                            <label htmlFor='title'>
                               Review
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="write review here"
                                    value={newReview.title}
                                    // onChange={handleChange}
                                />
                            </label>
                            <br />
                            <input type="submit" value="Post Review" />
                        </div>
                    </form>
                </section>
                {movie && movie.length ? loaded() : loading()}
            </div >
        </>
    )
    {newReview.length > 0 ? (
        newReview.map(review => {
            return <p key={review.id}>Rating: {review.rating} <br /> {review.description}</p>
        })
    ): ( <p> No reviews for this product </p> )}
    const loading = () => (
        <>
            <h1>
                {/* Loading... */}
            </h1>
        </>
    );
    return (
        <div>{movie ? loaded() : loading()}</div>
    )
}

export default MovieDetails