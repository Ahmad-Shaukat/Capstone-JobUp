const GET_PROFILE = 'profile/GET_PROFILE';
const CLEAR_PROFILE = 'profile/CLEAR_PROFILE'



export const getProfile = (profile) => {
    return {
        type:GET_PROFILE,
        payload:profile
    }
}
export const clearProfile = () => {
    return {
        type: CLEAR_PROFILE
    }
}

export const getProfileThunk = () => 
    async(dispatch) => {
        const response = await fetch('/api/profiles/current');
        if (response.ok) {
            const profile = await response.json()
            console.log (profile, '---------------')
                await dispatch(getProfile(profile))
                return profile
        }
    }


export default function profileReducer(state = {}, action) {
    let newState = {}
    switch(action.type) {
        case GET_PROFILE:
            newState = {...state};
            newState['profile'] = action.payload
            return newState
        case CLEAR_PROFILE:
            return {}
        default:
            return state
    }
}