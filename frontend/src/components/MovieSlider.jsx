import React from "react";
import Slider from "react-slick";
import '../styles/headerHomepage.css'
function MovieSlider (props) {
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
            <img src={props.image[0]} alt="" />
            <div className="disc">
                <h1>Testing Description</h1>
                <p>Testing p</p>
                <a href="#">demo</a>
            </div>
            
        </Slider>
    )
}

export default MovieSlider
