import React from "react";
import Slider from "react-slick";
import '../styles/headerHomepage.css'
function MovieSlider(props) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[0]} alt="" />
                    <h3 className="h3-in-each-movie">{props.title[0]}</h3>
                </div>

                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[1]} alt="" />
                    <h3 className="h3-in-each-movie">{props.title[1]}</h3>
                </div>

                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[2]} alt="" />
                    <h3 className="h3-in-each-movie">{props.title[2]}</h3>
                </div>

                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[3]} alt="" />
                    <h3 className="h3-in-each-movie">{props.title[3]}</h3>
                </div>

                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[5]} alt="" />
                    <h3 className="h3-in-each-movie">{props.title[5]}</h3>
                </div>

                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[6]} alt="" />
                    <h3 className="h3-in-each-movie">{props.title[6]}</h3>
                </div>
                
                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[7]} alt="" />
                    <h3 className="h3-in-each-movie">{props.title[7]}</h3>
                </div>

                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[8]} alt="" />
                    <h3 className="h3-in-each-movie">{props.title[8]}</h3>
                </div>

                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[9]} alt="" />
                    <h3 className="h3-in-each-movie">{props.title[9]}</h3>
                </div>

               

        </Slider>
    )
}

export default MovieSlider
