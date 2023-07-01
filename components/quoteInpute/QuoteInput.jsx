"use client"

import { addQuoteAction, updateQuoteAction } from '@/redux/actions/quoteActions'
import { addErrorToastAction } from '@/redux/actions/toastAction'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Styles from "./quoteInput.module.css"
import Cookies from 'universal-cookie'
import QuoteListItem from '../quoteListItem/QuoteListItem'
import { usePathname, useRouter } from 'next/navigation'
import { CANCEL_EDIT_QUOTE_CLICK } from '@/redux/actionTypes'

const QuoteInput = ( { authorName, user_quotes, loginUser } ) => {

    const pathname = usePathname()
    const dispatch = useDispatch()
    const router = useRouter()
    const cookies = new Cookies()
    const stateUserQuote = useSelector( state => state.userQuote )
    const editQuoteData = useSelector( state => state.editQuoteData )
    const [ userQuote, setUserQuote ] = useState( user_quotes )
    const [ quote, setQuote ] = useState( "" )

    useEffect( () => {
        if ( stateUserQuote?.length > 0 ) {
            setUserQuote( stateUserQuote )
        }
    }, [ stateUserQuote ] )

    useEffect( () => {
        if ( editQuoteData?.isEdit === true ) {
            setQuote( editQuoteData?.data?.quote )
        } else {
            setQuote( "" )
        }
    }, [ editQuoteData ] )

    const handleAddQuote = ( e ) => {
        e.preventDefault()
        if ( editQuoteData?.isEdit === true ) {
            if ( quote?.trim()?.length >= 10 ) {
                const userData = cookies.get( "loginUserData" )
                dispatch( updateQuoteAction( editQuoteData?.id, { quote: quote, userId: userData?.user?._id }, userData?.token, router ) )
                setQuote( "" )
            } else {
                dispatch( addErrorToastAction( "Quote must have atleast 10 characters." ) )
            }
        } else {
            if ( quote?.trim()?.length >= 10 ) {
                const userData = cookies.get( "loginUserData" )
                dispatch( addQuoteAction( { quote: quote, authorId: userData?.user?._id }, userData?.token, router ) )
                setQuote( "" )
            } else {
                dispatch( addErrorToastAction( "Quote must have atleast 10 characters." ) )
            }
        }
    }

    const handleClickCanceEditlBtn = () => {
        dispatch( { type: CANCEL_EDIT_QUOTE_CLICK } )
    }

    return (
        <div className={`container`}>
            <form className={`${Styles.input_group}`} onSubmit={e => handleAddQuote( e )}>
                <input placeholder="Enter new item here" type="text" className={`${Styles.input_field}`} onChange={e => setQuote( e.target.value )} value={quote} />
                <button className={`${Styles.submit_button}`} type='submit'><span>{
                    editQuoteData?.isEdit === true
                        ?
                        <>
                            Update
                        </>
                        :
                        "ADD"
                }</span></button>
                {
                    editQuoteData?.isEdit === true ?
                        <button className={`${Styles.submit_button} ${Styles.cancel_button}`} type='submit' onClick={handleClickCanceEditlBtn}><span>Cancel</span></button>
                        : null
                }
            </form>
            <div className={`my-5`}>
                {
                    userQuote?.length > 0
                        ?
                        userQuote?.map( quote => (
                            <QuoteListItem key={quote._id} quote={quote} authorName={authorName} loginUser={loginUser} pathname={pathname} />
                        ) )
                        :
                        <h3 className={`text-center text-secondary`}>Please add your quote.</h3>
                }
            </div>
        </div>
    )
}

export default QuoteInput