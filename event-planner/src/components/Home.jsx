import NavBar from "../routes/Navbar"
import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext"
import Dashboard from "./Dashboard";

export default function Home(){

    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);

    function logOut(){
        setCurrentUser("");
        useNavigate("/login");
    }

    return(
        <>
        <NavBar/>
        <div>
            <Dashboard/>
            <button onClick={logOut}>Log out</button>
        </div>
        </>
    )
}