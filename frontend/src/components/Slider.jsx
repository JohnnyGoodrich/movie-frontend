import React from "react"
import { Carousel } from "react-bootstrap"
function Slider(props) {
    return (
        <>
            <Carousel className="carousel-container">
                <Carousel.Item interval={1500}>
                    <img
                        className="slider"
                        src={props.movieImage[0]}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>{props.movieList[0]}</h3>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img
                        className="slider"
                        src={props.movieImage[1]}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>{props.movieList[1]}</h3>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={1500}>
                    <img
                        className="slider"
                        src={props.movieImage[2]}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>{props.movieList[2]}</h3>
                        {/* <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Slider