import { CLEAR_ALL_QUOTE, GET_ALL_QUOTES, LIKE_QUOTE_DONE } from "../actionTypes"

const initState = []

export const allQuotesReducer = ( state = initState, action ) => {
    switch ( action.type ) {
        case GET_ALL_QUOTES:
            return action.payload
        case LIKE_QUOTE_DONE:
            return action.payload
        case CLEAR_ALL_QUOTE:
            return []
        default:
            return state
    }
}