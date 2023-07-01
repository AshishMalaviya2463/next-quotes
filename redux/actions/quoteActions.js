import axios from "axios"
import { ADD_USER_QUOTE, CANCEL_EDIT_QUOTE_CLICK, EDIT_QUOTE_CLICK, GET_ALL_QUOTES, LIKE_QUOTE_DONE, QUOTE_UPDATED } from "../actionTypes"
import { addErrorToastAction, addSuccessToastAction } from "./toastAction"

export const addQuoteAction = ( data, token, router ) => async ( dispatch ) => {
    await axios.post( "/api/quotes", data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } )
        .then( data => {
            dispatch( { type: ADD_USER_QUOTE, payload: data?.data?.quotes } )
            dispatch( addSuccessToastAction( data?.data?.message ) )
            router.refresh()
        } )
        .catch( err => {
            dispatch( addErrorToastAction( err?.response?.data?.message ) )
        } )
}

export const getAllQuotesAction = () => async ( dispatch ) => {
    await axios.get( `/api/quotes/all` )
        .then( data => {
            dispatch( { type: GET_ALL_QUOTES, payload: data?.data?.quotes } )
        } )
        .catch( err => {
            dispatch( addErrorToastAction( err?.response?.data?.message ) )
        } )
}

export const likeDislikeQuoteAction = ( id, data, token, router ) => async ( dispatch ) => {

    await axios.post( `/api/quotes/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } )
        .then( data => {
            dispatch( { type: LIKE_QUOTE_DONE, payload: data?.data?.quotes } )
            router.refresh()
        } )
        .catch( err => {
            dispatch( addErrorToastAction( err?.response?.data?.message ) )
        } )
}

export const editQuoteAction = ( id, data, token ) => ( dispatch ) => {
    dispatch( { type: EDIT_QUOTE_CLICK, payload: { id, data, token } } )
}

export const updateQuoteAction = ( id, data, token, router ) => async ( dispatch ) => {
    await axios.post( `/api/quotes/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } )
        .then( data => {
            dispatch( addSuccessToastAction( data?.data?.message ) )
            dispatch( { type: QUOTE_UPDATED, payload: data?.data?.quotes } )
            dispatch( { type: CANCEL_EDIT_QUOTE_CLICK } )
            router.refresh()
        } )
        .catch( err => {
            dispatch( addErrorToastAction( err?.response?.data?.message || err ) )
        } )
}

export const deleteQuoteAction = ( id, token, setDeleteModalShow, router ) => async ( dispatch ) => {
    await axios.delete( `/api/quotes/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } )
        .then( data => {
            setDeleteModalShow( false )
            dispatch( addSuccessToastAction( data?.data?.message ) )
            dispatch( { type: QUOTE_UPDATED, payload: data?.data?.quotes } )
            router.refresh()
        } )
        .catch( err => {
            dispatch( addErrorToastAction( err?.response?.data?.message || err ) )
        } )
}