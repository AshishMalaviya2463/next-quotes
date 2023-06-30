import React from 'react'
import LikeDlikeBtn from './LikeDlikeBtn'
import Styles from "./quoteItem.module.css"

const QuoteListItem = ( { quote, authorName, loginUser, pathname } ) => {

    return (
        <div className={Styles.quote_item_container}>
            <p className={Styles.quote}>{quote?.quote}</p>
            <p className={`${Styles.quote_author} `}>
                <span>
                    <LikeDlikeBtn quote={quote} loginUser={loginUser} />
                </span>
                <span className={`${Styles.author_name} `}>
                    {
                        pathname === "/profile"
                            ?
                            <>
                                {new Date( quote?.updatedAt ).toLocaleDateString()} {new Date( quote?.updatedAt ).toLocaleTimeString( 'en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                } )}
                            </>
                            : null
                    } ~ {authorName}
                </span>
            </p>
        </div>
    )
}

export default QuoteListItem