import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { CartContext } from '../pages/_app'
import axios from 'axios'
import Styles from '../styles/components/CartAddressCard.module.scss'

const CartAddressCard = ({ id, address, total }) => {

    const router = useRouter()
    const context = useContext(CartContext)
    const [cart, addItems] = context.cart
    const [restaurant, setRestaurant] = context.restaurant
    console.log({ restaurant })
    const clearCart = context.reset

    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const deliver = async () => {
        const data = { address: address.title, restaurant: restaurant.name, total, food: [] };
        for (let i = 0; i < cart.length; i++) {
            const { item, count } = cart[i];
            data.food.push({ item: item.id, count });
        }
        const URL = `/api/user/${id}/history`
        const res = await axios.post(URL, data).then(res => res.data)
        setIsNotificationVisible(true);
    }

    const success = () => {
        setIsNotificationVisible(false);
        clearCart();
        router.push('/user')

    }

    return (
        <>
            <div className={Styles.card}>
                <h4>{address.title}</h4>
                <p>{address.text}</p>
                <button onClick={deliver}>DELIVER HERE</button>
            </div>
            {isNotificationVisible &&
                <div className={Styles.success}>
                    <div>
                        Order from {restaurant.name} has been delivered to {address.title}
                    </div>
                    <button onClick={success}>EXIT</button>
                </div>
            }
        </>
    )
}

export default CartAddressCard
