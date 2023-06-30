import dbConnect from "@/backend/database/conn";
import Quote from "@/backend/models/quoteModel";
import User from "@/backend/models/userModel";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { authMiddleware } from "../authMiddleware";
import { ObjectId } from "mongodb";
const Filter = require( 'bad-words' );

export async function POST ( req, res ) {
    try {
        await dbConnect()
        const filter = new Filter();
        const cookieStore = cookies()
        const headresData = headers()
        const getAuth = await authMiddleware( headresData )
        const body = await req.json()

        if ( getAuth === false ) {
            cookieStore.delete( "loginUserData" )
            return NextResponse.json( {
                message: "Unauthorized"
            }, {
                status: 401
            } )
        }

        const containsBadWord = filter.isProfane( body?.quote );

        if ( containsBadWord === true ) {
            return NextResponse.json( {
                message: "Your message contains inappropriate content."
            }, {
                status: 400
            } )
        }

        await Quote.create( {
            ...body,
            authorId: new ObjectId( body.authorId )
        } )

        const quotes = await Quote.find( { authorId: body.authorId } )

        return NextResponse.json( {
            quotes: quotes.reverse(),
            message: "Quote created successfully"
        }, {
            status: 200
        } )
    } catch ( err ) {
        return NextResponse.json( {
            message: err
        }, {
            status: 500
        } )
    }

}