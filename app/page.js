import QuoteListItem from '@/components/quoteListItem/QuoteListItem'
import { cookies, headers } from 'next/headers';
import React from 'react'

const getUser = async () => {
  const headersData = headers();
  const protocol = headersData.get( "x-forwarded-proto" );
  const host = headersData.get( "host" );
  const res = await fetch( `${protocol}://${host}/api/quotes/all`, {
    next: {
      revalidate: 0
    }
  } )
  const allQuotes = await res.json()

  return allQuotes
}

const Home = async () => {

  const allQuotes = await getUser()
  const cookieStore = cookies()
  const userData = cookieStore.get( "loginUserData" )
  const coockieUserData = userData === undefined ? undefined : JSON.parse( userData?.value )

  return (
    <div className={`container mt-4`}>
      {allQuotes?.quotes?.length > 0
        ?
        allQuotes?.quotes?.map( quote => ( <QuoteListItem key={quote._id} quote={quote} authorName={quote.author_name} loginUser={coockieUserData} /> ) )
        :
        <h2 className={`text-center text-secondary mt-5 pt-5`}>No Quotes Available.</h2>
      }
    </div>
  )
}

export default Home