import dbConnect from '@/backend/database/conn';
import User from '@/backend/models/userModel';
import { cookies, headers } from 'next/headers'
import { NextResponse } from "next/server";
import { authMiddleware } from '../authMiddleware';
import Quote from "@/backend/models/quoteModel";

export async function POST ( req, res ) {

    try {
        await dbConnect()
        const cookieStore = cookies()
        const headresData = headers()
        const getAuth = await authMiddleware( headresData )
        const body = await req.json()
        const existingUser = await User.findOne( { email: body.email } );
        const quotes = await Quote.find( { authorId: existingUser?._id } )
        const total_likes = await quotes.reduce( ( total, quote ) => total + quote.likes.length, 0 );
        const total_dislikes = await quotes.reduce( ( total, quote ) => total + quote.dislikes.length, 0 );

        if ( getAuth === false || existingUser === null ) {
            cookieStore.delete( "loginUserData" )
            return NextResponse.json( {
                message: "Unauthorized"
            }, {
                status: 401
            } )
        }

        return NextResponse.json( {
            user: {
                _id: existingUser?._id,
                name: existingUser?.name,
                phone: existingUser?.phone,
                email: existingUser?.email,
                createdAt: existingUser?.createdAt,
                updatedAt: existingUser?.updatedAt,
                quotes: quotes.reverse(),
                total_quotes: quotes?.length,
                total_likes,
                total_dislikes
            }
        }, {
            status: 200
        } )

    } catch ( err ) {
        return NextResponse.json( {
            user: err
        }, {
            status: 500
        } )
    }
}