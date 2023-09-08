const GET_USERS = 'user/GET_USERS'
const CLEAR_USERS = 'users/CLEAR_USERS'

export const getAllUsers=(users) => {
    return {
        type:GET_USERS,
        payload:users
    }
}

export const clearUsers = () =>  {
    return {
        type: CLEAR_USERS
    }
}
export const getAllUsersThunk = () => async (dispatch) => {
    const response = await fetch ('/api/users/');
    if (response.ok) {
        const users = await response.json()
        await dispatch(getAllUsers(users))
        return users
    }
}
 
export default function usersReducer (state={}, action) {
    let newState = {}
    switch (action.type) {
        case GET_USERS:
            newState = {...state}
            action.payload['users'].forEach((user) => {
                newState[user.id] = user
            })
            return newState
        case CLEAR_USERS:
            return {}
        default:
            return state
    }
}