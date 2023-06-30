import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers"
import dbConnect from "@/backend/database/conn";
import User from "@/backend/models/userModel"
var jwt = require( 'jsonwebtoken' );

export async function POST ( req, res ) {
    try {
        const body = await req.json()
        await dbConnect();
        const existingUser = await User.findOne( { email: body.email } );

        if ( existingUser ) {
            const validPass = await bcrypt.compare( body.password, existingUser.password )
            const userData = existingUser.toJSON()
            if ( validPass ) {
                let token = jwt.sign( userData, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                } );

                const userResponse = {
                    token,
                    user: {
                        _id: existingUser._id,
                        name: existingUser.name,
                        email: existingUser.email,
                        phone: existingUser.phone,
                    }
                }

                const cookieStore = cookies()
                cookieStore.set( "loginUserData", JSON.stringify( userResponse ) )

                // res.setPreviewData( { myCookie: `${userResponse}` } );
                // res.setHeader( 'Set-Cookie', `myCookie=${userResponse}; Path=/; HttpOnly` );

                return NextResponse.json( {
                    message: 'Login Successfull.',
                    ...userResponse
                }, {
                    status: 200
                } )
            } else {
                return NextResponse.json( {
                    message: 'Invalid Credencials.',
                }, {
                    status: 401
                } )
            }
        } else {
            return NextResponse.json( {
                message: 'Invalid Credencials.',
            }, {
                status: 401
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