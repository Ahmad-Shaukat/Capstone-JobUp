import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import CreateFavoriteList from "../CreateFavListModal"
import { useModal } from "../../context/Modal"
import EditFavoriteList from "../EditFavList"
import { getAllListsThunk } from "../../store/favoriteList"
import { useState } from "react"
import './app.css'



const AllFavriteLists = () => {
    const dispatch = useDispatch()
    const [feature, noFeature] = useState(false)

   
    const history = useHistory()
    const user = useSelector((store) => store.session.user)
    let allFavLists = useSelector((store) => store?.favoriteList)
    allFavLists = Object.values(allFavLists)
    console.log(allFavLists, '------------thesea are the favoriteList')
    useEffect(() => {
        dispatch(getAllListsThunk())
    }, [dispatch])
    if (!user) {
        history.push('/')
        return null
    }

    if (!feature) {
        return (
            <div>

            <div id="all-fav-cont">
                <p>This feature is currently unavailable</p>
            </div>
            </div>
        )
    }







    // this is the actual feature

    return <>
        <button>
            <OpenModalButton
                buttonText={'Create List'}
                modalComponent={
                    <CreateFavoriteList />
                }
            />
        </button>
        {allFavLists.map((list) => {
            return (
                <div key={list.id}>
                    <p>List Name: {list.name}</p>
                    {list.jobs.map((job) => {
                        return (
                            <div>
                                <p key={job.id}>{job.position}</p>
                            </div>


                        )

                    })}
                    <OpenModalButton
                                    buttonText={'Edit List'}
                                    modalComponent={
                                        <EditFavoriteList list={list}/>
                                    }
                                />
                </div>
            )

        })}
    </>
}
export default AllFavriteLists