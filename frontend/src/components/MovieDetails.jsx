import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MovieDetails(props) {
    const [person, setPerson] = useState(null)
    const [editForm, setEditForm] = useState("")
    const [newReview, setNewReview] = useState({
        Review: "",
     
    })

    const navigate = useNavigate()

    const params = useParams()
    const { id } = params

    const URL = `http://localhost:13000/people/${id}`

    // console.log("id", id, URL)
    // console.log(`Current Person: ${JSON.stringify(person)}`)

    const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })


    // const updatePerson = async (e) => {
    //     e.preventDefault()
    //     // console.log(editForm)
    //     try {
    //         const options = {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(editForm)
    //         }
    //         const response = await fetch(URL, options)
    //         const updatedPerson = await response.json()

    //         setPerson(updatedPerson)
    //         setEditForm(updatedPerson)

    //     } catch (err) {
    //         console.log(err)
    //         navigate(URL)
    //     }
    // }

    const getPerson = async () => {
        try {

            const response = await fetch(URL)
            const foundPerson = await response.json()

            setPerson(foundPerson)
            setEditForm(foundPerson)

        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit = async (e) => {
        // 0. prevent default (event object method)
        e.preventDefault()
        // 1. capturing our local state
        const currentState = { ...newReview }
        // check any fields for property data types / truthy value (function call - stretch)
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(currentState)
            }
            // 2. specify request method , headers, Content-Type
            // 3. make fetch to BE - sending data (requestOptions)

            // 3a fetch sends the data to API - (mongo)
            const response = await fetch(URL, requestOptions)
            // 4. check our response - 
            // 5. parse the data from the response into JS (from JSON) 
            const createdPerson = await response.json()
            console.log(createdPerson)
            // update local state with response (json from be)
            setNewReview([...person, createdPerson])
            // reset newReview state so that our form empties out
            setNewReview({
                review: "",
            })

        } catch (err) {
            console.log(err)
        }
    }
    const removePerson = async () => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(URL, options)
            const deletedPerson = await response.json()
            // console.log(deletedPerson)
            navigate('/')

            // navigate will change the browser's URL
            // which will cause react-router to "redirect" to home page;
            // the Main will then re-render the People component
            // upon mount People will fetch the updated index of person data

        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }

    useEffect(() => {
        getPerson()
    }, [])

    const loaded = () => (
        <>
            <section>
                <div className="person">
                    <h1>Movie Details Page</h1>
                    <h2>{person.name}</h2>
                    <h2>{person.title}</h2>
                    <img src={person.image} alt={person.name + " image"} height="200px" width="200px" />
                    <div>
                        <button className="delete" onClick={removePerson}>Remove Person</button>
                    </div>
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
                        
                        </div>
                        <div>
                        
                        </div>
                        <div>
                            <label htmlFor='title'>
                               Review
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="write review here"
                                    value={newReview.title}
                                    onChange={handleChange}
                                />
                            </label>
                            <br />
                            <input type="submit" value="Post Review" />
                        </div>
                    </form>
                </section>
                {person && person.length ? loaded() : loading()}
            </div >
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
        <div>{person ? loaded() : loading()}</div>
    )
}

export default MovieDetails