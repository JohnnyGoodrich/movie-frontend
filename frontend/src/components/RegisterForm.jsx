import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/auth.css'

const RegisterForm = ({ signUp }) => {

    const initialState = { username: "", password: "" }
    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const createdUserToken = await signUp(input)

        if (createdUserToken) {
            navigate("/")//remember this. I think it should be /
        } else {
            navigate("/auth")//remember when something goes wrong
        }
        setInput(initialState);
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h1>REGISTER</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name: </label>
                <input
                    id="username"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    id="password"
                    name="password"
                    className='register-password'
                    value={input.password}
                    onChange={handleChange}
                />
                <br />
                <br />
                <input id="login-button"type="submit" value="Sign Up" />
            </form>
        </>
    );
};

export default RegisterForm