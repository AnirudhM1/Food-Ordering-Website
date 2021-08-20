import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../pages/_app'
import Styles from '../styles/components/FoodItem.module.scss'

const FoodItem = ({ id, name, description, cost, imageUrl, quantity, restaurant }) => {

    const context = useContext(CartContext)
    const [cart, addItem] = context.cart;
    const [contextRestaurant, setRestaurant] = context.restaurant

    const addToCart = () => {
        console.log('Adding Item')
        console.dir({ contextRestaurant })
        if (contextRestaurant) {
            console.log('Checking restaurant')
            console.dir({ contextRestaurant, restaurant })
            if (contextRestaurant._id !== restaurant._id) {
                console.log('Restaurant not matched')
                return
            }
            // else {
            //     console.log('Restaurant matched')
            // }

        }
        else {
            setRestaurant(restaurant)
        }
        const item = {
            id, restaurant: restaurant.name, name, cost
        }
        addItem(item);
        setCount(count + 1)
        console.log('Item added')
    }
    const getCount = (searchItem) => {
        cart.forEach(({ item, count }) => {
            if (compare(item, searchItem)) {
                return count
            }
        })
        return 0
    }
    const compare = (obj1, obj2) => {
        return (obj1.id === obj2.id && obj1.restaurant === obj2.restaurant && obj1.name === obj2.name)
    }

    const defaultCount = getCount({ id, restaurant, name, cost })

    const [count, setCount] = useState(defaultCount);

    // useEffect(() => {
    //     console.log(cart)
    // })

    return (
        <div className={Styles.item}>
            <div className={Styles.text}>
                <p className={Styles.name}>{name}</p>
                <p className={Styles.description}>{description}</p>
                <div className={Styles.extras}>
                    <p className={Styles.cost}>&#8377;{cost}</p>
                    <p>Quantity: {quantity}</p>
                </div>
            </div>
            <div className={Styles.imageContainer}>
                <img className={Styles.image} src={imageUrl} alt={name} />
                <button onClick={addToCart}>{(count == 0) ? 'ADD' : `${count}`}</button>
            </div>
        </div>
    )
}

export default FoodItem
