import axios from 'axios'
import FoodGroup from '../../components/FoodGroup'
import Styles from '../../styles/pages/Restaurant.module.scss'

const Restaurant = ({ restaurant }) => {

    const menu = [
        {
            name: 'Pizza', foodItems: [
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 }
            ]
        },
        {
            name: 'Pizza', foodItems: [
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 }
            ]
        },
        {
            name: 'Pizza', foodItems: [
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 },
                { name: 'Chicken Pizza', description: 'Tasty chicken pizza', cost: 700, imageUrl: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg?output-format=auto&output-quality=auto', quantity: 2 }
            ]
        }
    ]

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
                    {menu.map((foodGroup, idx) => (
                        <h3 key={idx}>
                            <a href={`#${idx}`}>{foodGroup.name}</a>
                        </h3>
                    ))}
                </div>
                <div className={Styles.menu}>
                    {menu.map((foodGroup, idx) => (
                        <FoodGroup key={idx} name={foodGroup.name} foodItems={foodGroup.foodItems} id={idx} />
                    ))}
                </div>
            </div>
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
