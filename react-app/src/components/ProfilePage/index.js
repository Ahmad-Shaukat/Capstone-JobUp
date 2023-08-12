import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const GetProfile = () => {
    let user = useSelector((store) => store.session.user)
    console.log (user, '-------------this is user') 

    return <>
    <h3>Profile</h3>
    <p>{user.username}</p>
    <p>{user.email}</p>
    </>
}

export default GetProfile