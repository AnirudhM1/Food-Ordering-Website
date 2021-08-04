import Navbar from '../components/navbar/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

    return (
        <>
            <Navbar />
            <div style={{ "margin-top": '4rem' }}>
                <Component {...pageProps} />
            </div>
        </>
    )
}

export default MyApp
