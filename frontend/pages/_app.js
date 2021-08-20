import React, { useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import { Provider } from 'next-auth/client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

    const [cart, setCart] = useState([]);
    const addItem = (item) => {
        console.log('Entering addItem')
        const itemToAdd = findItem(item)
        console.log('Item recieved: ')
        console.log(itemToAdd)
        cart.push(itemToAdd);
        setCart(cart);
    }

    const findItem = (searchItem) => {
        console.log('Entering findItem')
        console.log('Current cart state is:')
        console.log(cart)
        let itemToAdd
        let found = false
        cart.forEach(({ item, count }, idx) => {
            console.log('Current state of for loop:')
            console.dir({ idx, item, count })
            if (compare(item, searchItem)) {
                console.log('items matched')
                console.log({ item, count })
                cart.splice(idx, 1)
                console.log('Updated cart state:')
                console.log(cart)
                console.log('Count:', count)
                // const ItemToAdd
                found = true
                itemToAdd = { item, count: count + 1 }
            }
            else {
                console.log("Items did not match")
            }
        })
        if (found)
            return itemToAdd
        else
            return { item: searchItem, count: 1 }
    }

    const compare = (obj1, obj2) => {
        console.log('Entered compare')
        console.log('Comparing:')
        console.dir({ obj1, obj2 })
        return (obj1.id === obj2.id && obj1.restaurant === obj2.restaurant && obj1.name === obj2.name)
    }

    const [restaurant, setRestaurant] = useState(null)

    return (
        <Provider session={pageProps.session}>
            <CartContext.Provider value={{ cart: [cart, addItem], restaurant: [restaurant, setRestaurant] }}>
                <Navbar />
                <div style={{ "marginTop": '4rem' }}>
                    <Component {...pageProps} />
                </div>
            </CartContext.Provider>
        </Provider>
    )
}

export default MyApp

export const CartContext = React.createContext();
