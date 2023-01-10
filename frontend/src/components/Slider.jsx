import { useState, useEffect } from 'react';
import React from "react"
import { Carousel } from "react-bootstrap"
import '../styles/slider.css'
// import { Link } from 'react';



function Slider(props) {
    const urlMovie = "https://movie-backend-project3.herokuapp.com/movie"
    const [movie, setMovie] = useState(null)
        useEffect(() => {
        fetch(urlMovie)
            .then((response) => response.json())
            .then((json) => {
                setMovie(json)

            })
            .catch(console.error)
    }, [])

    const [index, setIndex] = useState(0)
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);};
        if (!movie){
            return(<h1>no movies</h1>)
        }else{
            const eachMovie = movie.map((movies, imageIndex) =>
            
                <Carousel.Item key={imageIndex} interval={5000}>
                    <img
                        className="slider"
                        src={movies.image}
                        alt="First slide"
                        
                    />
                    <Carousel.Caption>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            
            )
    return (
        // <Link key={movie._id} to={`/review/${movie._id}`}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {eachMovie}
            </Carousel>
        // </Link>
    );
        }
    
}

export default Slider