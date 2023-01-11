# Movie*Buff*
## Team
John Goodrich - Frontend/styling<br/>
Triet Truong - Frontend/authentication<br/>
Chris West - Backend/documentation<br/>

## Description
Movie*Buff* is a web app that allows users to rate & review the most action-packed and sweaty movies from the 80's and 90's. 
<br/>
<br/>
This is a fullstack application with a frontend built in React, coupled with an Express backend that serves JSON data and offers full CRUD functionality between three data models.

## Technologies
React, JavaScript, CSS, Bootstrap, Netlify <br/>
Express, MongoDB, Mongoose, Node.js, Heroku

### Resources
Deployed site: https://movie-buff-movie.netlify.app/
<br/>
Frontend repo: https://github.com/JohnnyGoodrich/movie-frontend/tree/main/frontend
<br/>
Backend repo: https://github.com/cwest9400/movie-backend
<br/>
Backend deployment: https://movie-backend-project3.herokuapp.com/
<br/>
Planning documentation: https://github.com/JohnnyGoodrich/movie-frontend/blob/main/planning.md
<br/>
Backend API documentation: https://github.com/cwest9400/movie-backend/blob/main/readme.md

## Screen Captures of Current Version
### Frontend
#### Home page
![Screen Shot 2023-01-10 at 3 37 24 PM](https://user-images.githubusercontent.com/116116801/211792104-3a069292-5fbb-42f7-8b88-f8a5ea865bf8.png)
<br>
#### All movies page
![Screen Shot 2023-01-10 at 3 38 10 PM](https://user-images.githubusercontent.com/116116801/211792346-0b836588-7306-4001-8884-a806e056bab9.png)
<br>
#### Movie details and reviews page
![Screen Shot 2023-01-10 at 3 39 42 PM](https://user-images.githubusercontent.com/116116801/211792393-8278e202-489c-4e41-98e6-cd7cdc652e84.png)
<br>
#### Edit or delete movie detail page
![Screen Shot 2023-01-10 at 3 40 35 PM](https://user-images.githubusercontent.com/116116801/211792437-bf51b723-22cb-40bb-9f05-48b4493d284b.png)

### backend
#### JSON data
![Screen Shot 2023-01-09 at 11 06 10 AM](https://user-images.githubusercontent.com/116116801/211792058-339fff85-3e57-45c3-aa53-628c8cdfb4c9.png)

## User Stories
- As a user, I want to browse from a list of movies and rate the ones that I've seen before, so that I can express my opinion and save other movie viewers' time.
- As a user, I want to see ratings and reviews of movies that I have not seen before, so that I can make an informed choice.
- As a user, I want to be able to edit or delete my review, in case I make a mistake or my opinion changes.

## User flow
![Screen Shot 2023-01-11 at 6 29 55 AM](https://user-images.githubusercontent.com/116116801/211795413-3b58ecdf-aa30-429b-a444-f3c0bbbd5635.png)


## Future implementation
- error handling for better user experience (submission ranges, custom error pages)
- user options (logout option, a way to find posted reviews)
- display user on reviews


## Triumphs
- MVP deployment was smooth and had few hiccups.
- styling is on brand

## Cool Code
```
        {token ?
                        <div className='review-list'>
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
                        </div> :
                        <div className='review-list'>
                            {reviews ? (
                                reviews.map((review, index) => {

                                    return (

                                        <div key={review._id} className='review-list'>
                                            <div  className='edit'>
                                                <div className='review'>

                                                    <p data-num="" className='rating-number'>Rating: {review.rating}</p>
                                                    <p className='review-comment'>"{review.comment}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (<p> No reviews for this product </p>)}
                        </div>}
```

## Challenges
- posting reviews via frontend user input form
- authentification/user accounts
- github merge conflicts

