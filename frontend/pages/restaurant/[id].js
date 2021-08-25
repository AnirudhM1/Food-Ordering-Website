import { useContext } from 'react'
import axios from 'axios'
import FoodGroup from '../../components/FoodGroup'
import { CartContext } from '../_app'
import Styles from '../../styles/pages/Restaurant.module.scss'

const Restaurant = ({ restaurant }) => {

    const context = useContext(CartContext)
    const [cart, addItem] = context.cart

    // const menu = [
    //     {
    //         name: 'Pizza', foodItems: [
    //             { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
    //             { name: 'Veg Pizza', description: 'Why would you order this? No need to pay. It is free', cost: 0, imageUrl: 'https://static.toiimg.com/thumb/53351352.cms?imgsize=151967&width=800&height=800', quantity: 0 },
    //             { name: 'Chicken salami Pizza', description: 'Thin crust chicken salami pizza', cost: 750, imageUrl: 'https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/2020-03/super-fast-thin-crust-pizza.jpg?itok=u3Xodz0C', quantity: 2 },
    //             { name: 'Mixed Pizza', description: 'Pizza with different ingredients', cost: 800, imageUrl: 'https://imgmedia.lbb.in/media/2020/12/5fe323e5282cde4610e3face_1608721381076.jpg', quantity: 2 }
    //         ]
    //     },
    //     {
    //         name: 'Burger', foodItems: [
    //             { name: 'Chicken Burger', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/190416-chicken-burger-082-1556204252.jpg', quantity: 2 },
    //             { name: 'Veg Burger', description: 'Tasty veg pizza', cost: 700, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/190416-chicken-burger-082-1556204252.jpg', quantity: 2 },
    //             { name: 'Double Chicken Burger', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/190416-chicken-burger-082-1556204252.jpg', quantity: 2 },
    //             { name: 'Fish Burger', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/190416-chicken-burger-082-1556204252.jpg', quantity: 2 }
    //         ]
    //     },
    //     {
    //         name: 'Desert', foodItems: [
    //             { name: 'Mango Ice Cream', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'http://fun-18592.kxcdn.com/images/uploads/article-images/_mobile/category-icecream.jpg', quantity: 2 },
    //             { name: 'Chocolate Ice Cream', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'http://fun-18592.kxcdn.com/images/uploads/article-images/_mobile/category-icecream.jpg', quantity: 2 },
    //             { name: 'Strawberry Ice Cream', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'http://fun-18592.kxcdn.com/images/uploads/article-images/_mobile/category-icecream.jpg', quantity: 2 },
    //             { name: 'Guava Ice Cream', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'http://fun-18592.kxcdn.com/images/uploads/article-images/_mobile/category-icecream.jpg', quantity: 2 }
    //         ]
    //     }
    // ]


    return (
        <div className={Styles.main}>
            <div className={Styles.info} >
                <img src={restaurant.imageUrl} alt={restaurant.name} />
                <div className={Styles.about}>
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.type}</p>
                    <div className={Styles.extras}>
                        <div className={Styles.rating} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                                <path fill="currentColor" className={Styles.star} d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                            </svg>
                            <p>{restaurant.rating}</p>
                        </div>
                        <div>
                            <p>&#8377;{restaurant.cost}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Styles.content}>

                <div></div>
                <div className={Styles.foodGroup}>
                    {restaurant.menu.map((foodGroup, idx) => (
                        <h3 key={idx}>
                            <a href={`#${idx}`}>{foodGroup.name}</a>
                        </h3>
                    ))}
                </div>
                <div className={Styles.menu}>
                    {restaurant.menu.map((foodGroup, idx) => (
                        <FoodGroup key={idx} name={foodGroup.name} foodItems={foodGroup.foodItems} restaurant={restaurant} id={idx} />
                    ))}
                </div>
            </div>
            {(cart.length > 0) &&
                <a className={Styles.cart} href="/cart"><button>View Cart</button></a>
            }
        </div>
    )
}

export default Restaurant

export const getServerSideProps = async (context) => {
    const id = context.query.id;
    const restaurant = await axios.get(`http://localhost:3000/api/restaurants/${id}`).then(res => res.data);
    return {
        props: {
            restaurant
        }
    }
}
