import React, { useState } from 'react'
import Styles from '../styles/components/Search.module.scss'

const Search = (props) => {
    const defaultValue = props.defaultValue || ''
    const [value, setValue] = useState(defaultValue)
    return (
        <form className={Styles.form} action={`/search/${value}`}>
            <input type="text" className={Styles.input} placeholder="Search for restaurants" value={value} onChange={e => setValue(e.target.value)} />
        </form>
    )
}

export default Search
