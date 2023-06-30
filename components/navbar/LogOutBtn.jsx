"use client"

import { logoutAction } from '@/redux/actions/authActions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux'

const LogOutBtn = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const handleClickLogout = () => {
        dispatch( logoutAction( router ) )
    }

    return (
        <li>
            <div onClick={handleClickLogout}>Log Out</div>
        </li>
    )
}

export default LogOutBtn