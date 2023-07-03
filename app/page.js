import AllQuotesHome from '@/components/allQuotesHome/AllQuotesHome';
import QuoteListItem from '@/components/quoteListItem/QuoteListItem'
import { cookies, headers } from 'next/headers';
import React from 'react'

// const getUser = async () => {
//   const headersData = headers();
//   const protocol = headersData.get( "x-forwarded-proto" );
//   const host = headersData.get( "host" );
//   const res = await fetch( `${protocol}://${host}/api/quotes/all`, {
//     cache: "no-cache"
//   } )
//   const allQuotes = await res.json()

//   return allQuotes
// }

const Home = () => {

  // const allQuotes = await getUser()
  const cookieStore = cookies()
  const userData = cookieStore.get( "loginUserData" )
  const coockieUserData = userData === undefined ? undefined : JSON.parse( userData?.value )

  return (
    <div className={`container mt-4`}>

      <AllQuotesHome
        // quotes={allQuotes?.quotes}
        coockieUserData={coockieUserData} />
    </div>
  )
}

export default Home