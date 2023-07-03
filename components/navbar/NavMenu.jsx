"use client"

import { logoutAction } from '@/redux/actions/authActions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from "@fortawesome/free-solid-svg-icons"
import Styles from "./navbar.module.css"

const NavMenu = ( { loginUser } ) => {

    const [ showTog, setShowTog ] = useState( false )
    const router = useRouter()
    const dispatch = useDispatch()
    const handleClickLogout = () => {
        dispatch( logoutAction( router ) )
    }

    return (
        <>
            <button className={`${Styles.toggle_btn}`} onClick={() => setShowTog( !showTog )}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <ul className={`${Styles.toggle_ul} ${showTog ? Styles.show_toggle : ""}`}>
                {
                    loginUser !== undefined ?
                        loginUser?.login === false ?
                            ( <>
                                <li onClick={() => setShowTog( false )}>
                                    <Link href={"/login"}>Login</Link>
                                </li>
                            </> )
                            : ( <>
                                <li onClick={() => setShowTog( false )}>
                                    <Link href={"/profile"}>Profile</Link>
                                </li>
                                <li onClick={() => setShowTog( false )}>
                                    <div onClick={handleClickLogout}>Log Out</div>
                                </li>
                            </> )
                        : null
                }
            </ul>
        </>
    )
}

export default NavMenu