import React, { useState } from 'react'
import { signIn, signOut, getSession } from 'next-auth/client'
import User from '../models/User'
import AddressCard from '../components/AddressCard'
import OrderCard from '../components/OrderCard'
import AddAddress from '../components/AddAddress'
import Styles from '../styles/pages/User.module.scss'

const user = ({ user_json }) => {
    const user = JSON.parse(user_json)
    const edit = () => {
        console.log('EDIT');
    }

    const [option, setOption] = useState('address');
    const [isActive, setIsActive] = useState(false)

    const data = (option === 'address') ? user && user.address : user && user.history
    const Card = (option === 'address') ? AddressCard : OrderCard


    return (
        <>
            <div className={Styles.main}>
                {!user && (
                    <>
                        Not signed in
                        <br />
                        <button onClick={signIn}>Sign In</button>
                    </>
                )}
                {
                    user && (
                        <div className={Styles.container}>
                            <div className={Styles.user}>
                                <img src={user.image} alt={`${user.name}'s profile photo`} />
                                <div className={Styles.details}>
                                    <h2>{user.name}</h2>
                                    <p>{user.email}</p>
                                </div>
                                <div className={Styles.buttons}>
                                    <button onClick={edit}>EDIT</button>
                                    <button onClick={signOut}>Sign Out</button>
                                </div>
                            </div>
                            <div className={Styles.history}>
                                <div className={Styles.switch}>
                                    <button onClick={(e) => setOption('address')}>Addresses</button>
                                    <button onClick={(e) => setOption('order')}>Past orders</button>
                                </div>
                                <div className={(option === 'address' ? Styles.address : Styles.order)}>
                                    {data.map((element, idx) => (
                                        <Card key={idx} element={element} userId={user._id} />
                                    ))}
                                    {
                                        (option === 'address') &&
                                        <div className={Styles.addAddress}>
                                            <button onClick={() => setIsActive(true)}>Add Address</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {user &&
                <AddAddress id={user._id} isActive={isActive} setIsActive={setIsActive} />
            }
        </>
    )
}

export default user

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    const user_json = (session) ? await User.findOne({ googleId: session.user.googleId }).populate('address').populate('history.food.item').then(res => JSON.stringify(res)) : null
    return {
        props: {
            user_json
        }
    }
}
