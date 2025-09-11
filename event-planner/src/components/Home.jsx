import NavBar from "../routes/Navbar"
import { useContext } from "react"
import { CurrentUserContext } from "../CurrentUserContext"

export default function Home(){

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    return(
        <>
        <NavBar/>
        <div>
            <h1>Hello world!</h1>
        </div>
        </>
    )
}