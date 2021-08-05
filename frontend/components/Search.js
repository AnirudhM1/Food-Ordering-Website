import { useState } from 'react'
import Styles from '../styles/components/Search.module.scss'

const Search = () => {
    const [value, setValue] = useState('')

    return (
        <form className={Styles.form} action="search">
            <input type="text" className={Styles.input} placeholder="Search for restaurants" value={value} onChange={e => setValue(e.target.value)} />
        </form>
    )
}

export default Search
