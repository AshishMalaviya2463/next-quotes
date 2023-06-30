'use client'
import { clearToastAction } from '@/redux/actions/toastAction';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'

const Toast = () => {

    const dispatch = useDispatch()
    const toastData = useSelector( state => state.toastData )

    useEffect( () => {
        if ( toastData.type !== null ) {

            if ( toastData.type === "success" ) {
                toast.success( toastData?.message, {
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                } );
            } else {
                toast.error( toastData?.message, {
                    position: "top-center",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                } );
            }

            setTimeout( () => {
                dispatch( clearToastAction() )
            }, 2000 )
        }
    }, [ toastData.type ] )

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Toast