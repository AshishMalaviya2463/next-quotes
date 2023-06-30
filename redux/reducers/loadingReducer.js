import { CLEAR_TOAST, ERROR_TOAST, SET_LOADING_FALSE, SET_LOADING_TRUE, SUCCESS_TOAST } from "../actionTypes"

const initState = false

export const loadingReducer = ( state = initState, action ) => {
    switch ( action.type ) {
        case SET_LOADING_TRUE:
            return true
        case SET_LOADING_FALSE:
            return false
        default:
            return state
    }
}