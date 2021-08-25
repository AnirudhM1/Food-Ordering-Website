import { useState } from 'react'
import router from 'next/router'
import axios from 'axios'
import Styles from '../styles/components/AddAddress.module.scss'

const AddressCard = ({ id, isActive, setIsActive }) => {

    const URL = `http://localhost:3000/api/user/${id}/address`;

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const addAddress = async (e) => {
        e.preventDefault();
        const body = { title, text };
        const res = await axios.post(URL, body).then(res => res.data);
        setIsActive(false);
        router.reload();
    }

    const exit = () => {
        setIsActive(false)
    }

    const display = (isActive) ? { display: 'block' } : { display: 'none' };

    return (
        <div className={Styles.main} style={display}>
            <div className={Styles.buttonContainer}>
                <button className={Styles.exit} onClick={exit}>X</button>
            </div>
            <h2>Add an address</h2>
            <form className={Styles.form} onSubmit={addAddress}>
                <div className={Styles.field}>
                    <input type="text" name="title" className={Styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label htmlFor="title" className={Styles.label}>Title</label>
                </div>
                <div className={Styles.field}>
                    <input type="text" name="text" className={Styles.input} value={text} onChange={(e) => setText(e.target.value)} />
                    <label htmlFor="text" className={Styles.label}>Address</label>
                </div>
            </form>
            <div className={Styles.buttonContainer}>
                <button className={Styles.submit} onClick={addAddress}>SUBMIT</button>
            </div>
        </div>
    )
}

export default AddressCard
