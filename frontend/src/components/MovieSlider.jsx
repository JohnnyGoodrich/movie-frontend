import React, { useRef } from "react";
import Slider from "react-slick";
import '../styles/headerHomepage.css'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
function MovieSlider(props) {
    const arrowRef = useRef(null)
    var settings = {
        className: "center",
        centermode: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
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
        <>
            <Slider ref={arrowRef} {...settings}>
                <Link to={`review/${props.id[5]}`} key={props.id}>
                    <div className='each-movie'>
                        <img className="each-movie-img" src={props.image[5]} alt="" />
                        <h3 className="h3-in-each-movie"></h3>
                    </div>
                </Link>
                <Link to={`review/${props.id[7]}`} key={props.id}>
                    <div className='each-movie'>
                        <img className="each-movie-img" src={props.image[7]} alt="" />
                        <h3 className="h3-in-each-movie"></h3>
                    </div>
                </Link>
                <Link to={`review/${props.id[3]}`} key={props.id}>
                    <div className='each-movie'>
                        <img className="each-movie-img" src={props.image[3]} alt="" />
                        <h3 className="h3-in-each-movie"></h3>
                    </div>
                </Link>
                <Link to={`review/${props.id[props.id.length - 1]}`} key={props.id}>
                    <div className='each-movie'>
                        <img className="each-movie-img" src={props.image[props.image.length - 1]} alt="" />
                        <h3 className="h3-in-each-movie"></h3>
                    </div>
                </Link>
                <Link to={`review/${props.id[6]}`} key={props.id}>
                    <div className='each-movie'>
                        <img className="each-movie-img" src={props.image[6]} alt="" />
                        <h3 className="h3-in-each-movie"></h3>
                    </div>
                </Link>
                <Link to={`review/${props.id[4]}`} key={props.id}>
                    <div className='each-movie'>
                        <img className="each-movie-img" src={props.image[4]} alt="" />
                        <h3 className="h3-in-each-movie"></h3>
                    </div>
                </Link>
                {/* <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[10]} alt="" />
                    <h3 className="h3-in-each-movie">{props.desc[10]}</h3>
                </div> */}
                <Link to={`review/${props.id[8]}`} key={props.id}>
                    <div className='each-movie'>
                        <img className="each-movie-img" src={props.image[8]} alt="" />
                        <h3 className="h3-in-each-movie"></h3>
                    </div>
                </Link>
                <Link to={`review/${props.id[1]}`} key={props.id}>
                <div className='each-movie'>
                    <img className="each-movie-img" src={props.image[1]} alt="" />
                    <h3 className="h3-in-each-movie"></h3>
                </div>
                </Link>
            </Slider>
            <div className="button-movie-slider">
                <button className="back" onClick={() => arrowRef.current.slickPrev()}>
                    {<FaChevronLeft />}
                </button>
                <button className="next" onClick={() => arrowRef.current.slickNext()}>
                    {<FaChevronRight />}
                </button>
            </div>
        </>
    )
}
export default MovieSlider
