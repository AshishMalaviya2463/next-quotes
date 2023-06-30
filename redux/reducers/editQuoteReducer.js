import { CANCEL_EDIT_QUOTE_CLICK, EDIT_QUOTE_CLICK } from "../actionTypes"

const initState = {
    id: null, data: null, token: null, isEdit: false
}

export const editQuoteReducer = ( state = initState, action ) => {
    switch ( action.type ) {
        case EDIT_QUOTE_CLICK:
            return {
                ...action.payload,
                isEdit: true
            }
        case CANCEL_EDIT_QUOTE_CLICK:
            return {
                id: null, data: null, token: null, isEdit: false
            }
        default:
            return state
    }
}