const GET_FAVLIST = 'favoriteList/GET_FAVLIST'
const ADD_FAVLIST = 'favoriteList/ADD_FAVLIST'
const DELETE_FAVLIST = 'favoriteList/DELETE_FAVLIST'
const ADD_JOB = 'favoriteList/ADD_JOB'
const DELETE_JOB = 'favoriteLIst/DELETE_JOB'
const CLEAR_FAVORITELIST = 'favoriteList/CLEAR_FAVORITELIST'

export const getAllLists = (lists) => {
    return {
        type: GET_FAVLIST,
        payload: lists
    }
}

export const addFavlist = (favList) => {
    return {
        type: ADD_FAVLIST,
        payload: favList
    }
}
export const deleteFavlist = (listId) => {
    return {
        type: DELETE_FAVLIST,
        payload: listId
    }
}
export const addJob = (listId, job) => {
    return {
        type: ADD_JOB,
        payload: {
            listId, job
        }
    }
}
export const deleteJob = (listId, jobId) => {
    return {
        action: DELETE_JOB,
        payload: {
            listId, jobId
        }
    }
}
export const clearfavlist = () => {
    return {
        type: CLEAR_FAVORITELIST
    }
}

export const getAllListsThunk = () => async (dispatch) => {
    const response = await fetch('/api/favorites/current');
    console.log ('-------------in the thunk')
    if (response.ok) {
        const favorites = await response.json()
        await dispatch(getAllLists(favorites))
        // console.log (favorites, '-----------------favorites')
        return favorites
    }
}
export const createListThunk = (list) => async (dispatch) => {
    const response = await fetch(`api/favorites/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(list)
    });
    if (response.ok) {
        const favList = await response.json()
        dispatch (addFavlist(favList))
        return favList
    }
}
export const editListThunk = (listId, updatedList) => async (dispatch) => {
    const response = fetch(`/api/favorites/${listId}/edit`, {
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(updatedList)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addFavlist)
        return data
    }
}

export const deleteListThunk = (list) => async (dispatch) => {
    const response = fetch(`/api/favorites/${list.Id}/delete`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(list)
    })
    if (response.ok) {
        dispatch(deleteFavlist(list.id))
    }
}

export const addJobThunk = (listId, job) => async (dispatch) =>  {
    const response = fetch(`/api/favorites/${listId}/jobs/new`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addJob(data))
        return data
    }
}
export const deleteJobThunk = (listId, jobId) => async (dispatch) => {
    const response = fetch (`/api/favorties/${listId}/jobs/${jobId}/delete`, {
       method:'DELETE',
       headers: {
        'Content-Type': 'application.json'
       } 
    })
    if (response.ok) {
        dispatch(deleteJob(listId, jobId))
        return true
    }
    return false
}
export default function favoritesRedcuer (state = {}, action) {
    let newState = {}
    switch(action.type) {
        case GET_FAVLIST:
            newState = {...state}
            console.log (action.payload, '--------------------------')
            action.payload.forEach(list => {
                newState[list.id] = list
            });
            return newState
        case ADD_FAVLIST:
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_FAVLIST:
            newState = {...state}
            delete newState[action.payload.id]
            return newState
        case ADD_JOB:
            newState = {...state}
            const {listId, job} = action.payload
            newState[listId] = {
                ...newState[listId], job:[...newState[listId].jobs, job]
            }
            return newState
        case DELETE_JOB:
            newState = {...state}
            const {favListId, listJob} = action.payload
            delete newState[favListId].jobs[listJob]
            return newState
        case CLEAR_FAVORITELIST:
            return {}
        
        default:
            return state
    }
}