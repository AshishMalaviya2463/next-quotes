import dbConnect from "@/backend/database/conn";
import Quote from "@/backend/models/quoteModel";
import { ObjectId } from "mongodb"
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { authMiddleware } from "../../authMiddleware";

const quoteReturnFunc = async ( message, id ) => {
    const quotes = await Quote.find( { authorId: id } )
    return NextResponse.json( {
        quotes: quotes.reverse(),
        message: message
    }, {
        status: 200
    } )
}

export async function POST ( req, { params } ) {

    try {
        await dbConnect()
        const body = await req.json()
        const { id } = params

        if ( body?.like === true ) {
            await Quote.findByIdAndUpdate( id, {
                $pull: {
                    dislikes: {
                        userId: new ObjectId( body.userId )
                    }
                },
                $push: {
                    likes: {
                        userId: new ObjectId( body.userId )
                    }
                }
            }, { new: true, runValidators: true } )
            return quoteReturnFunc( "Quote liked successfully.", body.userId )
        }

        if ( body?.like === false ) {
            await Quote.findByIdAndUpdate( id, { $pull: { likes: { userId: new ObjectId( body.userId ) } } }, { new: true, runValidators: true } )
            return quoteReturnFunc( "Quote unliked successfully.", body.userId )
        }

        if ( body?.dislikes === true ) {
            await Quote.findByIdAndUpdate( id, {
                $pull: {
                    likes: {
                        userId: new ObjectId( body.userId )
                    }
                },
                $push: {
                    dislikes: {
                        userId: new ObjectId( body.userId )
                    }
                }
            }, { new: true, runValidators: true } )
            return quoteReturnFunc( "Quote disliked successfully.", body.userId )
        }

        if ( body?.dislikes === false ) {
            await Quote.findByIdAndUpdate( id, { $pull: { dislikes: { userId: new ObjectId( body.userId ) } } }, { new: true, runValidators: true } )
            return quoteReturnFunc( "Quote disliked removed successfully.", body.userId )
        }

        if ( body?.like === undefined && body?.dislikes === undefined ) {
            if ( body?.quote ) {
                const cookieStore = cookies()
                const headresData = headers()
                const getAuth = await authMiddleware( headresData )

                if ( getAuth === false ) {
                    cookieStore.delete( "loginUserData" )
                    return NextResponse.json( {
                        message: "Unauthorized"
                    }, {
                        status: 401
                    } )
                }

                await Quote.findByIdAndUpdate( id, { quote: body?.quote }, { new: true, runValidators: true } )
                return quoteReturnFunc( "Quote updated successfully.", body.userId )
            }
        }
    } catch ( err ) {
        return NextResponse.json( {
            message: err
        }, {
            status: 500
        } )
    }
}

export async function DELETE ( req, { params } ) {
    try {
        await dbConnect()
        const { id } = params
        const body = await req.json()
        const cookieStore = cookies()
        const headresData = headers()
        const getAuth = await authMiddleware( headresData )

        if ( getAuth === false ) {
            cookieStore.delete( "loginUserData" )
            return NextResponse.json( {
                message: "Unauthorized"
            }, {
                status: 401
            } )
        }

        await Quote.findByIdAndDelete( id )

        return quoteReturnFunc( "Quote deleted successfully.", body.userId )

    } catch ( err ) {
        return NextResponse.json( {
            message: err
        }, {
            status: 500
        } )
    }
}