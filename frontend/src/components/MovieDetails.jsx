import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './MovieDetails.css'
import { Link } from 'react-router-dom'
import { getUserToken } from '../utils/authToken'//Triet's stuff
import logo from '../images/Screen Shot 2023-01-09 at 10.14.57 AM.png'

// function MovieDetails(props) {
function MovieDetails(props) {
    const token = getUserToken() //Triet's stuff
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

    const navigate = useNavigate()


    // const URL = `https://movie-buff-backend.herokuapp.com/movie/${id}`
    const BASE_URL = `https://movie-backend-project3.herokuapp.com/movie/${id}`//testing


    // const URL2 = `https://movie-buff-backend.herokuapp.com/review/${id}` John
    const URL2 = `https://movie-backend-project3.herokuapp.com/review/${id}`//Triet's stuff

    // const URL3 = `http://localhost:3000/review/${id}` John
    const URL3 = `https://movie-backend-project3.herokuapp.com/review/${id}`//Triet

    // const URL4 = `http://localhost:3000/review/${id}/edit` John
    const URL4 = `https://movie-backend-project3.herokuapp.com/review/edit/${id}`//Triet


    // console.log("id", id, URL)
    // console.log(`Current Person: ${JSON.stringify(movie)}`)

    // const handleChange = (e) => setEditForm({ ...editForm, [e.target.name]: e.target.value })

    const getMovie = async () => {
        try {

            const response = await fetch(URL2)
            const foundMovie = await response.json()
            setMovie(foundMovie.title)
            setReviews(foundMovie.reviews)
            // console.log(foundMovie)
            // setEditForm(foundMovie)

            // important!!!!!!*****
            // average()

        } catch (err) {
            console.log(err)
        }
    }

    // const getReview = async () => {
    //     try {

    //         const response = await fetch(URL2)
    //         const foundReview = await response.json()
    //         // console.log(response.json)
    //         setReviews(foundReview)
    //         // console.log(foundReview)
    //         // setEditForm(foundMovie)
    //         // console.log(newReview.reviews[0]._id)

    // important!!!!!!********
    // function average() {

    //     const array = []
    //     let sum = 0
    //     for (let i = 0; i < newReview.reviews.length; i++) {
    //         array.push(newReview.reviews[i].rating)
    //         // averageRating = array/newReview.reviews.length
    //         sum += array[i]
    //         const averageRating = sum / array.length
    //         //  console.log(i)
    //         //  console.log(newReview.reviews[i].rating)
    //         console.log(averageRating)
    //     }
    // }



    // average()
    // const getReview = async () => {
    //     try {

    //         const response = await fetch(URL2)
    //         const foundReview = await response.json()
    //         // console.log(response.json)
    //         setNewReview(foundReview)
    //         console.log(foundReview)
    //         // var yearStart = 2030;
    //         // var yearEnd = 2040;

    //         // var arr = [];

    //         // for (var i = yearStart; i < yearEnd+1; i++) {
    //         //     arr.push(i);
    //         //     console.log(arr)
    //         // }



    // //     } catch (err) {
    // //         console.log(err)
    // //     }
    // // }

    const handleChange = (e) => {
        // console.log(newReview.reviews._id)
        const userInput = { ...editForm }
        userInput[e.target.name] = e.target.value
        setEditForm(userInput)
        // console.log(userInput)
        // console.log(URL2)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentState = { ...editForm }
        console.log(currentState)
        // console.log(newReview.reviews[0]._id)
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`//Triet's stuff
                },
                body: JSON.stringify(currentState)

            }
            const response = await fetch(URL2, requestOptions)
            // console.log(URL2)
            const createdReview = await response.json()
            // console.log(createdReview)
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
    // useEffect(() => {

    // //     getReview()
    // // }, [])
    //     getReview()
    // }, [])
    // useEffect(() => {
    // //   average()
    //     },[])

    // }, [reviews.length])

    // circle attempt using setAttribute()
    // let averageRating= document.querySelector(".circle-num")
    // let ratings = averageRating.getAttribute("data-num")
    // console.log(ratings)
    // console.log(averageRating)
    //average rating function attempt
    let ratingArray = []

    //change circle number attempt
    const dataNumData = document.querySelector(".progress-ite")
    function myFunction() {

        dataNumData.setAttribute("data-num", "40");

    }

    //   myFunction()
    // change circle number attempt
    // let num=document.querySelector(".card1:nth-child(1) svg circle:nth-child(2)")
    // console.log(num)
    // function changeCircleNum (){
    //     document.querySelector(".card1:nth-child(1) svg circle:nth-child(2)").style.color="red"
    // }
    // changeCircleNum()

    let items = document.querySelectorAll('.progress-item');
    const counters = Array(items.length);
    const intervals = Array(items.length);
    counters.fill(0);

    // items.forEach((number, index) => {
    //     intervals[index] = setInterval(() => {
    //         if (counters[index] == parseInt(number.dataset.num)) {
    //             clearInterval(intervals[index]);
    //         } else {
    //             counters[index] += 1;
    //             number.style.background = "conic-gradient(red calc(" + counters[index] + "%), gray 0deg)";
    //             number.setAttribute('data-value', counters[index] + "%");
    //             number.innerHTML = counters[index] + "%";
    //         }
    //     }, 15);
    // });Triet old stuff

    // const loaded = () => (
    //     <div className='details-content'>
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
                <div className="">

                    <Link to={`/`}>
                        <img src={logo} className='header-logo'></img>

                    </Link>
                </div>
            </Link>

            <section className='movie-details-1'>
                <div className="movie">
                    <div>
                        {/* <h2>{movie.title}</h2> */}
                        <img className='movie-details-image' src={movie.image} alt={movie.name + " image"} height="400px" width="400px" />
                        <p className='movie-info'><span className='age-rating'>{movie.agerating}</span>&nbsp; {movie.year}, {movie.hlength}h{movie.mlength}m</p>
                    </div>
                    <div className='container1'>
                        {/* <div className='card1'>
                            <div className='box'>
                                <div className='percent'>
                                    <svg>
                                        <circle cx='70' cy="70" r='70'></circle>
                                        <circle cx='70' cy="70" r='70'></circle>
                                    </svg>
                                    <div className='circle-number'>
                                        <h2 className='circle-num'>90<span>%</span></h2>
                                    </div>
                                </div>
                                        <button className='ratingBtn' onClick={myFunction}>click</button>
                                <h2 className='circle-text'></h2>
                            </div>
                        </div> */}

                        <div id="progress" >
                            <div data-num="90" className="progress-item">ds</div>
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
                    {token ?<section>
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
                    </section>:null}
                </div >

                <h2 className='review-header'>Reviews:</h2>
                <div className='all-reviews'>
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