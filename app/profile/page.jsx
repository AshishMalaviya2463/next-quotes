import Image from 'next/image'
import React from 'react'
import Styles from "./profile.module.css"
import userImage from "../user.jpg"
import { cookies, headers } from 'next/headers'
import axios from 'axios'
import { redirect } from 'next/navigation'
import QuoteInput from '@/components/quoteInpute/QuoteInput'

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
                login: true,
                token: coockieUserData?.token
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

const Profile = async () => {

    const loginUser = await getUser()
    if ( loginUser?.login === false ) {
        redirect( "/" )
    }

    return (
        <div className="container">
            <div className={Styles.center}>
                <div className={Styles.profile}>
                    <div className={Styles.image}>
                        <div className={Styles.circle_1} />
                        <div className={Styles.circle_2} />
                        <Image src={userImage} width={95} height={95} alt="Jessica Potter" />
                    </div>
                    <div className={Styles.name}>{loginUser?.user?.name}</div>
                    <div className={Styles.job}>{loginUser?.user?.email}</div>
                    <div className={Styles.job}>{loginUser?.user?.phone}</div>
                </div>
                <div className={Styles.stats}>
                    <div className={Styles.box}>
                        <span className={Styles.value}>{loginUser?.user?.total_quotes}</span>
                        <span className={Styles.parameter}>Quotes</span>
                    </div>
                    <div className={Styles.box}>
                        <span className={Styles.value}>{loginUser?.user?.total_likes}</span>
                        <span className={Styles.parameter}>
                            Appreciation <br />
                            (Likes)
                        </span>
                    </div>
                    <div className={Styles.box}>
                        <span className={Styles.value}>{loginUser?.user?.total_dislikes}</span>
                        <span className={Styles.parameter}>
                            Dissatisfaction <br />
                            (Dis-Likes)
                        </span>
                    </div>
                </div>
            </div>
            <QuoteInput authorName={loginUser?.user?.name} user_quotes={loginUser?.user?.quotes} loginUser={loginUser} />
        </div>
    )
}

export default Profile