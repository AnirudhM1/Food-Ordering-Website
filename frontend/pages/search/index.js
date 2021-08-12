import Search from '../../components/Search'
import Styles from '../../styles/pages/Search.module.scss'

const search = () => {
    return (
        <div className={Styles.page}>
            <Search />
            <div className={Styles.main}>
                <div className={Styles.filters}>filter</div>
                <div className={Styles.container}>container</div>
            </div>
        </div>
    )
}

export default search
