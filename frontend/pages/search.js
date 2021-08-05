import { useRouter } from 'next/router'
import Search from '../components/Search'
import Styles from '../styles/pages/Search.module.scss'

const search = () => {
    return (
        <div className={Styles.main}>
            <Search />
        </div>
    )
}

export default search
