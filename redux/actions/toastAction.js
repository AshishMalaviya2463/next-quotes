import { CLEAR_TOAST, ERROR_TOAST, SUCCESS_TOAST } from "../actionTypes"

export const addSuccessToastAction = ( data ) => ( dispatch ) => {
    dispatch( { type: SUCCESS_TOAST, payload: data } )
}

export const addErrorToastAction = ( data ) => ( dispatch ) => {
    dispatch( { type: ERROR_TOAST, payload: data } )
}

export const clearToastAction = () => ( dispatch ) => {
    dispatch( { type: CLEAR_TOAST } )
}