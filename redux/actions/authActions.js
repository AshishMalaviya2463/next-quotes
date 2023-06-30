import axios from "axios"
import { CLEAR_USER_QUOTE } from "../actionTypes"
import { loadingFalseAction, loadingTrueAction } from "./loadingAction"
import { addSuccessToastAction, addErrorToastAction } from "./toastAction"

export const registrationAction = ( data, resetFormData, setSignInOn ) => async ( dispatch ) => {
    dispatch( loadingTrueAction() )
    await axios.post( "/api/registration", data )
        .then( data => {
            resetFormData()
            dispatch( addSuccessToastAction( data?.data?.message ) )
            setSignInOn( true )
            dispatch( loadingFalseAction() )
        } )
        .catch( err => {
            dispatch( addErrorToastAction( err?.response?.data?.message || err?.message ) )
            dispatch( loadingFalseAction() )
        } )
}

export const loginAction = ( data, resetFormData, router, coockies ) => async ( dispatch ) => {
    dispatch( loadingTrueAction() )
    await axios.post( "/api/login", data )
        .then( data => {
            resetFormData()
            // localStorage.setItem( "token", data?.data?.token )
            // localStorage.setItem( "user", data?.data?.user )
            coockies.set( "loginUserData", {
                token: data?.data?.token,
                user: data?.data?.user
            } )
            router.push( "/" )
            dispatch( addSuccessToastAction( data?.data?.message ) )
            dispatch( loadingFalseAction() )
            router.refresh()
        } )
        .catch( err => {
            dispatch( addErrorToastAction( err?.response?.data?.message || err?.message ) )
            dispatch( loadingFalseAction() )
        } )
}

export const logoutAction = ( router ) => async ( dispatch ) => {
    dispatch( loadingTrueAction() )
    await axios.get( "/api/logout" )
        .then( data => {
            dispatch( addSuccessToastAction( data?.data?.message ) )
            dispatch( { type: CLEAR_USER_QUOTE } )
            dispatch( loadingFalseAction() )
            router.refresh()
            router.push( "/" )
        } )
        .catch( err => {
            dispatch( addErrorToastAction( err?.response?.data?.message || err?.message ) )
            dispatch( loadingFalseAction() )
        } )
}