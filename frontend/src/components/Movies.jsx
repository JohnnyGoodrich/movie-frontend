// import './People.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const People = (props) => {
    // define our state variable - []
    // react state
    const [people, setPeople] = useState([])
    const [newForm, setNewForm] = useState({
        name: "",
        image: "",
        title: "",
    })
    // fetch endpoint
    const BASE_URL = "https://movie-buff-backend.herokuapp.com/movie"


    const getPeople = async () => {
        try {
            const response = await fetch(BASE_URL)
            
            const allPeople = await response.json()
     
            setPeople(allPeople)
      
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        // console.log(newForm)
        const userInput = { ...newForm }
        userInput[e.target.name] = e.target.value
        setNewForm(userInput)
    }

    const handleSubmit = async (e) => {
        // 0. prevent default (event object method)
        e.preventDefault()
        // 1. capturing our local state
        const currentState = { ...newForm }
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
            const response = await fetch(BASE_URL, requestOptions)
            // 4. check our response - 
            // 5. parse the data from the response into JS (from JSON) 
            const createdPerson = await response.json()
            console.log(createdPerson)
            // update local state with response (json from be)
            setPeople([...people, createdPerson])
            // reset newForm state so that our form empties out
            setNewForm({
                name: "",
                image: "",
                title: "",
                review:[
                    {
                        
                    }
                ]
            })

        } catch (err) {
            console.log(err)
        }
    }

    const loaded = () => {
        return (<>
            <section className="people-list">
                {people?.map((movie) => {
                    return (
                        <Link key={movie._id} to={`/review/${movie._id}`}>
                            <div className="movie-card">
                                {/* React optimization / difference */}
                                <h1>{movie.name}</h1>
                                <img className='showpic' src={movie.image}height="200px" width="200px" />
                                <h3>{movie.title}</h3>
                            </div>
                        </Link>
                    )
                })
                }
            </section>
        </>
        )
    }

    const loading = () => (
        <section className="people-list">
            <h1>
                Loading...
                <span>
                    {" "}
                    <img
                        className="spinner"
                        src="https://freesvg.org/img/1544764567.png"
                    />
                </span>
            </h1>
        </section>
    );

    useEffect(() => {
        getPeople()
    }, [])
    // useEffect takes two arguments -> runs function upon component mount
    // react mount -> 
    return (
        <div>
            <section>
                <h2>Add a new movie</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>
                            Name
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="enter a movie's name"
                                value={newForm.name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='image'>
                            Image
                            <input
                                type="text"
                                id="image"
                                name="image"
                                placeholder="enter a movie's image"
                                value={newForm.image}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor='title'>
                            Title
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="enter a movie's title"
                                value={newForm.title}
                                onChange={handleChange}
                            />
                        </label>
                        <br />
                        <input type="submit" value="Create a new movie" />
                    </div>
                </form>
            </section>
            {people && people.length ? loaded() : loading()}
        </div >
    )

}

export default People