import { useContext } from 'react'
import { CartContext } from './_app'
import { getSession } from 'next-auth/client'
import User from '../models/User'
import CartAddressCard from '../components/CartAddressCard'
import Styles from '../styles/pages/Cart.module.scss'

const cart = ({ user_json }) => {

    const DELIVERY_CHARGES = 30
    const GST_PERCENTAGE = 0.18

    const context = useContext(CartContext)
    const [cart, addItem] = context.cart
    const [restaurant, setReataurant] = context.restaurant
    const user = JSON.parse(user_json)

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
                    <h2>Choose an address</h2>
                    <div className={Styles.address}>
                        {user.address.map((address) => (
                            <CartAddressCard key={address._id} id={user._id} address={address} total={charges.total} />
                        ))}
                    </div>
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
                        <div className={Styles.total}>
                            <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>TOTAL</div>
                            <div>&#8377;{charges.total}</div>
                        </div>
                    </div>
                </div>
            </div>
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
