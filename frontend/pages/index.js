// import axios from 'axios';
import dbConnect from '../lib/dbConnect'
import Restaurant from '../models/Restaurant'
import Search from '../components/Search';
import RestaurantCard from '../components/RestaurantCard';
import Styles from '../styles/pages/Home.module.scss';

const Home = ({ restaurants }) => {
    return (
        <div className={Styles.main}>
            <Search />
            <div className={Styles.container}>
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant._id}
                        id={restaurant._id}
                        name={restaurant.name}
                        type={restaurant.type}
                        imageUrl={restaurant.imageUrl}
                        rating={restaurant.rating}
                        cost={restaurant.cost}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;

export const getStaticProps = async ({ req }) => {
    await dbConnect();
    let restaurants;
    try {
        restaurants = await Restaurant.find({})
    } catch (e) {
        console.error(e.message);
        restaurants = []
    }

    return {
        props: {
            restaurants: JSON.parse(JSON.stringify(restaurants))
        }
    };
};
