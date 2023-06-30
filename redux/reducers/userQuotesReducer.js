import { ADD_USER_QUOTE, CLEAR_USER_QUOTE, QUOTE_UPDATED } from "../actionTypes"

const initState = []

export const userQuotesReducer = ( state = initState, action ) => {
    switch ( action.type ) {
        case ADD_USER_QUOTE:
            return action.payload
        case QUOTE_UPDATED:
            return action.payload
        case CLEAR_USER_QUOTE:
            return []
        default:
            return state
    }
}