import React from "react"
import { Carousel } from "react-bootstrap"
import '../styles/slider.css'
function Slider(props) {
    return (
        <>
            <Carousel className="carousel-container">
                <Carousel.Item interval={5000}>
                    <img
                        className="slider"
                        src={props.movieImage[0]}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={5000}>
                    <img
                        className="slider"
                        src={props.movieImage[1]}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item interval={5000}>
                    <img
                        className="slider"
                        src={props.movieImage[2]}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
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