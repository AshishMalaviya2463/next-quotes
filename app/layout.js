import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// config.autoAddCss = false
import './globals.css'
import { Poppins } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import ReduxProvider from '@/redux/ReduxProvider';
import Toast from '@/components/toast/Toast';

export const metadata = {
  title: 'QUOTEVERSE :Inspiring Quotes for Daily Motivation',
  description: 'QUOTEVERSE :Inspiring Quotes for Daily Motivation',
}

const poppins = Poppins( { subsets: [ 'latin' ], weight: "400" } )

export default function RootLayout ( { children } ) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={poppins.className}
      >
        <ReduxProvider>
          <Toast />
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
