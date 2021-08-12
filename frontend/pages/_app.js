import Navbar from '../components/navbar/Navbar'
import { Provider } from 'next-auth/client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

    return (
        <Provider session={pageProps.session}>
            <Navbar />
            <div style={{ "marginTop": '4rem' }}>
                <Component {...pageProps} />
            </div>
        </Provider>
    )
}

export default MyApp
