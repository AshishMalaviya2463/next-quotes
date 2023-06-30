"use client"

import { loginAction, registrationAction } from '@/redux/actions/authActions'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Styles from "./login.module.css"
import Cookies from 'universal-cookie'

const Login = () => {

    const dispatch = useDispatch()
    const loading = useSelector( state => state.loading )
    const router = useRouter()
    const coockies = new Cookies()

    const [ signInOn, setSignInOn ] = useState( false )
    const [ signUpFormData, setSignUpFormData ] = useState( {
        name: "",
        phone: "",
        email: "",
        password: ""
    } )

    const [ logInFormData, setLogInFormData ] = useState( {
        email: "",
        password: ""
    } )

    const resetFormData = () => {
        setSignUpFormData( {
            name: "",
            phone: "",
            email: "",
            password: ""
        } )
        setLogInFormData( {
            email: "",
            password: ""
        } )
    }

    const handleChangeSignUpField = ( e ) => {
        const { name, value } = e.target
        setSignUpFormData( data => ( {
            ...data,
            [ name ]: value
        } ) )
    }

    const handleChangeLogInField = ( e ) => {
        const { name, value } = e.target
        setLogInFormData( data => ( {
            ...data,
            [ name ]: value
        } ) )
    }

    const handleSubmitSignIn = ( e ) => {
        e.preventDefault()
        dispatch( registrationAction( signUpFormData, resetFormData, setSignInOn ) )
    }

    const handleSubmitLogin = ( e ) => {
        e.preventDefault()
        dispatch( loginAction( logInFormData, resetFormData, router, coockies ) )
    }

    return (
        <div className='container'>
            <div className={`${Styles.main}`}>
                <input type="checkbox" checked={signInOn} className={`${Styles.chk}`} id="chk" aria-hidden="true" onChange={() => {}} />
                <div className={`${Styles.signup}`}>
                    <form onSubmit={handleSubmitSignIn}>
                        <label className={`${Styles.input_label}`} onClick={() => setSignInOn( !signInOn )} htmlFor="chk" aria-hidden="true">Sign up</label>
                        <input className={`${Styles.input}`} type="text" name="name" placeholder="User name" required value={signUpFormData.name} onChange={handleChangeSignUpField} />
                        <input className={`${Styles.input}`} type="tell" name="phone" placeholder="0123456789" required value={signUpFormData.phone} onChange={handleChangeSignUpField} />
                        <input className={`${Styles.input}`} type="email" name="email" placeholder="Email" required value={signUpFormData.email} onChange={handleChangeSignUpField} />
                        <input className={`${Styles.input}`} type="password" name="password" placeholder="Password" required value={signUpFormData.password} onChange={handleChangeSignUpField} />
                        <button className={Styles.button} type="submit" disabled={loading}>
                            {
                                loading ? "Submitting..." : "Sign up"
                            }
                        </button>
                    </form>
                </div>
                <div className={`${Styles.login}`}>
                    <form onSubmit={handleSubmitLogin}>
                        <label className={`${Styles.input_label}`} onClick={() => setSignInOn( !signInOn )} htmlFor="chk" aria-hidden="true">Login</label>
                        <input className={`${Styles.input}`} type="email" name="email" placeholder="Email" required value={logInFormData.email} onChange={handleChangeLogInField} />
                        <input className={`${Styles.input}`} type="password" name="password" placeholder="Password" required value={logInFormData.password} onChange={handleChangeLogInField} />
                        <button className={Styles.button} type="submit" disabled={loading}>
                            {
                                loading ? "Logging in..." : "Login"
                            }
                        </button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
