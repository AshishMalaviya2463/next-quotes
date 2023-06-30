import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET ( req, res ) {
    try {
        const loginUserData = cookies().get( "loginUserData" )

        if ( loginUserData !== undefined ) {
            cookies().delete( loginUserData )
            return NextResponse.json( {
                message: 'Log Out Successfull.'
            }, {
                status: 200
            } )
        } else {
            return NextResponse.json( {
                message: 'You are not currently logged in.'
            }, {
                status: 200
            } )
        }

    } catch ( err ) {
        return NextResponse.json( {
            message: "Error : " + err
        }, {
            status: 500
        } )
    }
}