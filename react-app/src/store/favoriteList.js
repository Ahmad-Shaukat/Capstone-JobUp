const GET_FAVLIST = 'favoriteList/GET_FAVLIST'
const ADD_FAVLIST = 'favoriteList/ADD_FAVLIST'
const DELETE_FAVLIST = 'favoriteList/DELETE_FAVLIST'

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

export const getAllListsThunk = () => async (dispatch) => {
    const response = await fetch('api/favorites/current');
    if (response.ok) {
        const favorites = await response.json()
        await dispatch(getAllLists(favorites))
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

export default function favoritesRedcuer (state = {}, action) {
    let newState = {}
    switch(action.type) {
        case GET_FAVLIST:
            newState = {...state}
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
    }
}