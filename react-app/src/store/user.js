const GET_USERS = 'user/GET_USERS'

export const getAllUsers=(users) => {
    return {
        type:GET_USERS,
        payload:users
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
            console.log (action.payload, '---------------action from users')
            action.payload['users'].forEach((user) => {
                newState[user.id] = user
            })
            return newState
        default:
            return state
    }
}