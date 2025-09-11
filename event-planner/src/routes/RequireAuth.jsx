import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";

export default function RequireAuth({children}){
    const {currentUser} = useContext(CurrentUserContext);

    if (!currentUser || currentUser==""){
        return <Navigate to="/login" replace />
    } else {
        return children
    }
}