import axios from 'axios'
import React, { useState } from 'react'
import router from 'next/router'
import Styles from '../styles/components/AddressCard.module.scss'

const AddressCard = ({ element, userId }) => {
    const address = element;
    let host
    if (window) {
        host = window.location.origin;
    }
    else {
        host = 'http://localhost:3000'
    }
    const BUTTON_URL = `${host}/api/user/${userId}/address`;
    const addressId = address._id;

    const deleteAddr = async () => {
        await axios.delete(BUTTON_URL, { data: { addressId } });
        router.reload();
    }

    const confirmEdit = async (e) => {
        e.preventDefault();
        await axios.put(BUTTON_URL, { title, text, addressId });
        setEditMode(false);
        router.reload();
    }

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(address.title);
    const [text, setText] = useState(address.text);

    return (
        <div className={Styles.container}>
            {editMode ||
                <>
                    <h4>{address.title}</h4>
                    <p>{address.text}</p>
                    <div className={Styles.buttons}>
                        <button onClick={() => setEditMode(true)}>EDIT</button>
                        <button onClick={deleteAddr}>DELETE</button>
                    </div>
                </>
            }
            {editMode &&
                <form onSubmit={confirmEdit}>
                    <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
                    <input type="text" onChange={e => setText(e.target.value)} value={text} />
                    <div className={Styles.buttons}>
                        <input type="submit" value="CONFIRM" />
                        <button>DELETE</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default AddressCard
