import { useState, useEffect, useContext } from 'react'
import router from 'next/router'
import { CartContext } from './_app'
import { getSession, signIn } from 'next-auth/client'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import CartAddressCard from '../components/CartAddressCard'
import AddAddress from '../components/AddAddress'
import Styles from '../styles/pages/Cart.module.scss'

const cart = ({ user_json }) => {

    const DELIVERY_CHARGES = 30
    const GST_PERCENTAGE = 0.18

    const context = useContext(CartContext)
    const [contextCart, addItem] = context.cart
    const [cart, setCart] = useState([]);
    const [contextRestaurant, setContextRestaurant] = context.restaurant
    const [restaurant, setRestaurant] = useState(null)
    const reset = context.reset;
    let user
    if (user_json !== null) user = JSON.parse(user_json)

    useEffect(() => {

        if (contextCart.length == 0) {
            const token_cart = localStorage.getItem('cart');
            const token_restaurant = localStorage.getItem('restaurant')
            const SECRET = process.env.JWT_SECRET || 'SECRET';
            let decodedToken_cart
            let decodedToken_restaurant

            if (token_cart) {
                decodedToken_cart = jwt.verify(token_cart, SECRET);
            }
            if (token_restaurant) {
                decodedToken_restaurant = jwt.verify(token_restaurant, SECRET)
            }
            if (decodedToken_cart) {
                setCart(decodedToken_cart.cart);
            }
            if (decodedToken_restaurant) {
                setRestaurant(decodedToken_restaurant.rest)
            }
        }
        else {
            setCart(contextCart);
            setRestaurant(contextRestaurant)
            console.log({ restaurant })
        }
    }, [])


    const [isActive, setIsActive] = useState(false)

    const calculateTotal = () => {
        let subtotal = 0;
        cart.forEach(({ item, count }) => {
            subtotal += (count * item.cost)
        });

        const gst = subtotal * GST_PERCENTAGE;

        const total = subtotal + gst + DELIVERY_CHARGES

        return { subtotal, gst, total }
    }

    const charges = calculateTotal();

    return (
        <div className={Styles.main}>
            <div className={Styles.container}>
                <div className={Styles.info}>
                    {user &&
                        <>
                            <h2>Choose an address</h2>
                            <div className={Styles.address}>
                                {user.address.map((address) => (
                                    <CartAddressCard key={address._id} id={user._id} address={address} total={charges.total} />
                                ))}
                                <div className={Styles.addAddress}>
                                    <button onClick={() => setIsActive(true)}>Add Address</button>
                                </div>
                            </div>
                        </>
                    }
                    {(user !== null) ||
                        <>
                            <h2>You need to sign in to be able to order</h2>
                            <div className={Styles.signInContainer}>
                                <button onClick={() => signIn('google', { callbackUrl: 'http://localhost:3000/cart' })}>Sign In</button>
                            </div>
                        </>
                    }
                </div>
                <div className={Styles.order}>
                    {restaurant &&
                        <div className={Styles.restaurant}>
                            <div className={Styles.image}>
                                <img src={restaurant.imageUrl} alt={restaurant.name} />
                            </div>
                            <div className={Styles.text}>
                                <div className={Styles.title}>{restaurant.name}</div>
                                <div className={Styles.type}>{restaurant.type}</div>
                            </div>
                        </div>
                    }
                    {cart.map(({ item, count }, idx) => (
                        <div key={idx} className={Styles.item}>
                            <div className={Styles.food}>
                                {item.name}
                            </div>
                            <div className={Styles.info}>
                                <div className={Styles.count}>
                                    {count}
                                </div>
                                <div className={Styles.amount}>
                                    &#8377;{item.cost * count}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={Styles.bill}>
                        <div style={{ marginBottom: '1rem', fontWeight: 500, fontSize: '0.9rem' }}>Bill Details:</div>
                        <div className={Styles.subtotal_info}>
                            <div>Subtotal: </div>
                            <div>&#8377;{charges.subtotal}</div>
                        </div>
                        <div className={Styles.subtotal_info}>
                            <div>GST@{100 * GST_PERCENTAGE}%: </div>
                            <div>&#8377;{charges.gst}</div>
                        </div>
                        <div className={Styles.subtotal_info}>
                            <div>Delivery charges: </div>
                            <div>&#8377;{DELIVERY_CHARGES}</div>
                        </div>
                        <div className={Styles.total}>
                            <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>TOTAL</div>
                            <div>&#8377;{charges.total}</div>
                        </div>
                        <div className={Styles.reset}>
                            <button onClick={() => { reset(); router.reload() }}>Clear Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            {user &&
                <AddAddress id={user._id} isActive={isActive} setIsActive={setIsActive} />
            }
        </div>
    )
}

export default cart

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    const user_json = (session) ? await User.findOne({ googleId: session.user.googleId }).populate('address').then(res => JSON.stringify(res)) : null

    return {
        props: {
            user_json
        }
    }
}
