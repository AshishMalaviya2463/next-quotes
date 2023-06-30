import { SET_LOADING_FALSE, SET_LOADING_TRUE } from "../actionTypes"

export const loadingTrueAction = () => ( dispatch ) => {
    dispatch( { type: SET_LOADING_TRUE } )
}

export const loadingFalseAction = () => ( dispatch ) => {
    dispatch( { type: SET_LOADING_FALSE } )
}