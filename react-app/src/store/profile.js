const GET_PROFILE = 'profile/GET_PROFILE';


export const getProfile = (profile) => {
    return {
        type:GET_PROFILE,
        payload:profile
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
        default:
            return state
    }
}