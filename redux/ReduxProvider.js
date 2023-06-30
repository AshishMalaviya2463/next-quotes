'use client'
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute"
import { Provider } from "react-redux"
import { store } from "./store"

const ReduxProvider = ( { children } ) => {
    return (
        <>
            <Provider store={store}>
                {/* <ProtectedRoute /> */}
                {ProtectedRoute()}
                {children}

            </Provider>
        </>
    )
}

export default ReduxProvider