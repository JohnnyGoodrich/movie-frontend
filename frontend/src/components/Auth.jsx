// src/pages/Auth.jsx
import {getUserToken,setUserToken, clearUserToken, decodeToken} from "../utils/authToken"
import { useContext } from "react"
import { UserContext } from "../data"
import RegisterForm from "./RegisterForm"
import LoginForm from "./LoginForm"

function Auth(props){

    const {setAuth, setUser} = useContext(UserContext)
    
    const registerUser = async (data) => {
        try {
    
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    
            const newUser = await fetch(
                "https://movie-backend-project3.herokuapp.com/auth/register",
                configs
            )
    
            const parsedUser = await newUser.json()
            console.log(parsedUser)
    
            // sets local storage
            setUserToken(parsedUser.token)
            // put the returned user object in state
            setUser(parsedUser.user)
            // adds a boolean cast of the responses isAuthenticated prop
            setAuth(parsedUser.isLoggedIn)
    
            // alternative (safer) implementation would be to use jwt decode library - <https://www.npmjs.com/package/jwt-decode>
            // this would also require reconfiguring our backend so we only send tokens with a signup
    
            return parsedUser
        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }

    const loginUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
    
            const response = await fetch(
                "https://movie-backend-project3.herokuapp.com/auth/login",
                configs
            )
    
            const currentUser = await response.json()
            //console.log(currentUser)
    
            if (currentUser.token) {
                // sets local storage
                setUserToken(currentUser.token)
                // put the returned user object in state
                setUser(currentUser.user)
                setAuth(currentUser.isLoggedIn)
    
                return currentUser
            } else {
                throw `Server Error: ${currentUser.statusText}`
            }
        } catch (err) {
            console.log(err)
            clearUserToken();
            setAuth(false);
        }
    }
    

    return (
        <section className="registerForm-container">
            {/* <h1>Login / Register Container</h1> */}
            {/* <RegisterForm signUp={registerUser}/> */}
            <LoginForm signIn={loginUser}/>
            <br />
            <a href="/auth/register" id="register-id"> Create your account</a>
        </section>
    )
}

export default Auth