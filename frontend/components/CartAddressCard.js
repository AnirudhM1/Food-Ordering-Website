import React, { useState, useContext } from 'react'
import { CartContext } from '../pages/_app'
import axios from 'axios'
import Styles from '../styles/components/CartAddressCard.module.scss'

const CartAddressCard = ({ id, address, total }) => {

    const context = useContext(CartContext)
    const [cart, addItems] = context.cart
    const [restaurant, setRestaurant] = context.restaurant

    // const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const deliver = async () => {
        const data = { address: address.title, restaurant: restaurant.name, total, food: [] };
        console.log(data)
        for (let i = 0; i < cart.length; i++) {
            const { item, count } = cart[i];
            data.food.push({ item: item.id, count });
        }
        const URL = `/api/user/${id}/history`
        console.log({ URL })
        const res = await axios.post(URL, data).then(res => res.data)
        console.log({ res })
    }

    return (
        <div className={Styles.card}>
            <h4>{address.title}</h4>
            <p>{address.text}</p>
            <button onClick={deliver}>DELIVER HERE</button>
        </div>
    )
}

export default CartAddressCard
