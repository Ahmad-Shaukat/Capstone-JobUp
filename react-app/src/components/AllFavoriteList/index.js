import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import OpenModalButton from "../OpenModalButton"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"
import CreateFavoriteList from "../CreateFavListModal"
import { useModal } from "../../context/Modal"
import EditFavoriteList from "../EditFavList"
import { getAllListsThunk } from "../../store/favoriteList"



const AllFavriteLists = () => {
    const dispatch = useDispatch()

    // const store = useSelector((store) => store)
    // console.log (store, '-----------this is store')
    let allFavLists = useSelector((store) => store?.favoriteList)
    allFavLists = Object.values(allFavLists)
    console.log(allFavLists, '------------thesea are the favoriteList')
    useEffect(() => {
        dispatch(getAllListsThunk())
    }, [dispatch])

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
                                {/* <OpenModalButton
                                    buttonText={'Edit List'}
                                    modalComponent={
                                        <EditFavoriteList list={list}/>
                                    }
                                /> */}
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