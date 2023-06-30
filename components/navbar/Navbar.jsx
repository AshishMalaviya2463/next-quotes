import axios from 'axios'
import { cookies, headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'
import LogOutBtn from './LogOutBtn'
import Styles from "./navbar.module.css"

const getUser = async () => {
    const cookieStore = cookies()
    const userData = cookieStore.get( "loginUserData" )
    const coockieUserData = userData === undefined ? undefined : JSON.parse( userData?.value )
    if ( userData === undefined ) {
        return {
            user: undefined,
            login: false
        }
    } else {
        const headersData = headers();
        const protocol = headersData.get( "x-forwarded-proto" );
        const host = headersData.get( "host" );
        const userDetails = await axios.post( `${protocol}://${host}/api/userprofile`, coockieUserData?.user, {
            headers: {
                'Authorization': `Bearer ${coockieUserData?.token}`
            }
        } ).then( data => {
            return {
                user: data.data?.user,
                login: true
            }
        } ).catch( err => {
            return {
                user: {},
                login: false
            }
        } )
        return userDetails
    }
}

const Navbar = async () => {
    const loginUser = await getUser()

    return (
        <div className={`${Styles.nav_container}`} >
            <div className={`container d-flex justify-content-between align-items-center`}>
                <h1 className={`m-0 p-0 ${Styles.nav_logo}`}>
                    <Link href={"/"}>QuoteVerse</Link>
                </h1>
                <ul>
                    {
                        loginUser !== undefined ?
                            loginUser?.login === false ?
                                ( <>
                                    <li>
                                        <Link href={"/login"}>Login</Link>
                                    </li>
                                </> )
                                : ( <>
                                    <li>
                                        <Link href={"/profile"}>Profile</Link>
                                    </li>
                                    <LogOutBtn />
                                </> )
                            : null
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar