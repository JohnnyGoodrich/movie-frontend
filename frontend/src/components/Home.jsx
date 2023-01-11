import {Link} from 'react-router-dom'

function Home(props){
    return (<section>
        <h2>Welcome to People App</h2>
        <p>Sign in to connect with our People</p>
        <Link to="/auth">CONNECT</Link> 
        {" | "}
         <Link to="/">Movie Home Page</Link>
    </section>)
}

export default Home