import axios from 'axios'
import Search from '../components/Search'
import RestaurantCard from '../components/RestaurantCard'
import Styles from '../styles/pages/Home.module.scss'

const Home = ({ restaurants }) => {
    return (
        <div className={Styles.main}>
            HOME
            <Search />
            <div className={Styles.container}>
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} name={restaurant.name} type={restaurant.type} imageUrl={restaurant.imageUrl} rating={restaurant.rating} cost={restaurant.cost} />
                ))}
            </div>
        </div>
    )
}

export default Home;

export const getStaticProps = async () => {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/restaurants`).catch(e => console.error(e))
    const restaurants = res.data
    return {
        props: {
            restaurants
        }
    }
}
