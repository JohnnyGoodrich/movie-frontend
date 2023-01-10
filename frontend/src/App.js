import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import ReviewDetails from './components/ReviewDetails';
import AllMovies from './components/AllMovies'
import AuthRegister from './components/AuthRegister';
import Home from './components/Home'
import Auth from './components/Auth'
import { UserContext } from './data';
import { useState } from 'react';

function App() {
  const {Provider: UserInfo} = UserContext

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <div className="App">
       <UserInfo value={{
        isAuthenticated, 
        currentUser, 
        setAuth: setIsAuthenticated, 
        setUser: setCurrentUser
        }}>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/signIn" element={<Home />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/viewAllTopRatedMovies" element ={<AllMovies />}/>
        <Route path="/review/:id" element={<MovieDetails/>} />
        <Route path="/review/edit/:id" element={<ReviewDetails/>} />
      </Routes>
      </UserInfo>
    </div>
  );
}

export default App;
