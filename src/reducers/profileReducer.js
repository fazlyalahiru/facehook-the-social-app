import { actions } from "../actions"

const initialState = {
    user: null,
    posts: [],
    loading: false,
    error: null
}

const profileReducer = (state, action) => {
    switch (action.type) {
        case actions.profile.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            }
        }

        case actions.profile.DATA_FETCHED: {
            return {
                ...state,
                user: action.data.user,
                posts: action.data.posts,
                loading: false
            }
        }
        case actions.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.data.error.message
            }
        }

        default: {
            return state;
        }

    }
}

export { profileReducer, initialState }