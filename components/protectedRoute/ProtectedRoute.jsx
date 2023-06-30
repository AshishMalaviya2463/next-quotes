"use client"

import axios from 'axios'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';

const ProtectedRoute = () => {

    const getUser = async ( baseUrl, userData ) => {
        if ( userData === undefined ) {
            return {
                user: undefined,
                login: false
            }
        } else {
            const userDetails = await axios.post( `${baseUrl}/api/userprofile`, userData?.user, {
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                }
            } ).then( data => {
                return {
                    user: data.data?.user,
                    login: true
                }
            } ).catch( err => {
                return {
                    user: {},
                    login: false,
                    error: err
                }
            } )
            return userDetails
        }
    }

    const getData = async () => {
        const cookieStore = new Cookies();
        const userData = cookieStore.get( "loginUserData" )
        const data = await getUser( window.location.origin, userData )
        setLoginUserData( data )
    }

    const router = useRouter()
    const [ loginUserData, setLoginUserData ] = useState( null )

    const pathname = usePathname()
    useEffect( () => {
        getData()
    }, [ pathname ] )

    useEffect( () => {
        if ( loginUserData !== null ) {
            if ( loginUserData?.login === false ) {
                if ( pathname?.includes( "profile" ) ) {
                    router.push( "/" )
                }
            } else {
                if ( pathname?.includes( "login" ) ) {
                    router.push( "/" )
                }
            }
        }
    }, [ loginUserData, pathname ] )

    return null


}

export default ProtectedRoute