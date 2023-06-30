import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import dbConnect from "@/backend/database/conn";
import User from "@/backend/models/userModel"

export async function POST ( req, res ) {
    try {
        const body = await req.json()
        await dbConnect();
        const existingUser = await User.findOne( { email: body.email } );

        if ( existingUser ) {
            return NextResponse.json( {
                message: 'Email already exists',
            }, {
                status: 400
            } )
        }

        const salt = await bcrypt.genSalt( 12 );
        const hashedPassword = await bcrypt.hash( body.password, salt );

        await User.create( {
            ...body,
            password: hashedPassword
        } );

        return NextResponse.json( {
            message: "Registration successfull."
        }, {
            status: 201
        } )

    } catch ( err ) {
        return NextResponse.json( {
            message: "Error : " + err
        }, {
            status: 500
        } )
    }
}