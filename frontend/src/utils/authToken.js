import jwt_decode from "jwt-decode";
const getUserToken = () => {
    return localStorage.getItem('token')
}

const setUserToken = (token) => {
    return localStorage.setItem('token', token)
}

const clearUserToken = () => {
  return localStorage.setItem('token', "")
}

function decodeToken (token){
	return jwt_decode(token)
}

export {getUserToken,setUserToken, clearUserToken, decodeToken}

