import { CLEAR_TOAST, ERROR_TOAST, SUCCESS_TOAST } from "../actionTypes"

const initState = {
    type: null,
    message: ""
}

export const toastReducer = ( state = initState, action ) => {
    switch ( action.type ) {
        case SUCCESS_TOAST:
            return {
                type: "success",
                message: action.payload
            }
        case ERROR_TOAST:
            return {
                type: "error",
                message: action.payload
            }
        case CLEAR_TOAST:
            return {
                type: null,
                message: ""
            }
        default:
            return state
    }
}