import { getUserToken, setUserToken, clearUserToken } from "../utils/authToken"
import { useContext } from "react"
import { UserContext } from "../data"
import RegisterForm from "./RegisterForm"
import '../styles/auth.css'
function AuthRegister(props) {
    const { setAuth, setUser } = useContext(UserContext)
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
    return (
        <section className="registerForm-container">
            <RegisterForm signUp={registerUser} />
        </section>
    )
}

export default AuthRegister