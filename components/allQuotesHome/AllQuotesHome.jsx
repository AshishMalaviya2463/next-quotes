"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import QuoteListItem from '../quoteListItem/QuoteListItem'
import { getAllQuotesAction } from "../../redux/actions/quoteActions"

const AllQuotesHome = ( { quotes, coockieUserData } ) => {

    const dispatch = useDispatch()
    const allQuotes = useSelector( state => state.allQuotes )
    const [ finalAllQuotes, setFinalAllQuotes ] = useState( [] )

    useEffect( () => {
        dispatch( getAllQuotesAction() )
        console.log( "useEffect called" );
    }, [] )

    useEffect( () => {
        if ( allQuotes?.length > 0 ) {
            setFinalAllQuotes( allQuotes )
        } else {
            setFinalAllQuotes( [] )
        }
    }, [ allQuotes ] )

    return (
        <>
            {
                finalAllQuotes?.length > 0
                    ?
                    finalAllQuotes?.map( quote => ( <QuoteListItem key={quote._id} quote={quote} authorName={quote.author_name} loginUser={coockieUserData} /> ) )
                    :
                    <h2 className={`text-center text-secondary mt-5 pt-5`}>No Quotes Available.</h2>
            }
        </>
    )
}

export default AllQuotesHome