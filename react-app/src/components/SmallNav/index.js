import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import './app.css'




const BigSidebar = ({closeNav}) => {
        const closeHandle = () => {
                closeNav()
        }
        return <>
        <div className="small-nav-cont">

        <NavLink exact to ='/hello'><button onClick={closeHandle}>Stats</button></NavLink>
        <NavLink exact to ='/interviews'><button onClick={closeHandle}>All Interviews</button></NavLink>
        <NavLink exact to ='/newInterview'><button onClick={closeHandle}>Add Interview</button></NavLink>
        <NavLink exact to='/findjobs'><button onClick={closeHandle}>Find Jobs</button></NavLink>
        <NavLink exact to ='/favlists'><button onClick={closeHandle}>Favorites</button></NavLink>
        <NavLink exact to ='/aboutme'><button onClick={closeHandle}>About</button></NavLink>
        </div>
        </>
}
export default BigSidebar