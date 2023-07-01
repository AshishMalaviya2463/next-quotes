import dbConnect from "@/backend/database/conn";
import Quote from "@/backend/models/quoteModel";
import User from "@/backend/models/userModel";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"

export async function GET ( req, res ) {
    await dbConnect()
    const quotes = await Quote.find( {} )

    const getSingleUser = async ( id ) => {
        const allUsers = await User.findById( id );
        if ( allUsers !== null ) {
            return await allUsers.name
        }
        return "Anonymous"
    }

    const finalQuotesDataPromises = quotes.map( async ( quote ) => {
        if ( quote?.dislikes?.length < 5 ) {
            const author_name = await getSingleUser( quote.authorId );
            const data = {
                _id: quote._id,
                quote: quote?.quote,
                authorId: quote?.authorId,
                likes: quote?.likes,
                dislikes: quote?.dislikes,
                createdAt: quote?.createdAt,
                updatedAt: quote?.updatedAt,
                author_name: author_name
            };
            return data;
        }
    } );

    const finalQuotesDataResults = await Promise.all( finalQuotesDataPromises );
    const finalQuotesData = finalQuotesDataResults.filter( ( data ) => data !== undefined );

    return NextResponse.json( {
        quotes: finalQuotesData.reverse()
    }, {
        status: 200
    } )
}