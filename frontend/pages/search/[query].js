// import axios from 'axios'
import Restaurant from '../../models/Restaurant'
import Search from '../../components/Search'
import RestaurantCard from '../../components/RestaurantCard'
import Styles from '../../styles/pages/Search.module.scss'

const search = ({ query, restaurants, isValid }) => {
    return (
        <div className={Styles.page}>
            <Search defaultValue={query} />
            <div className={Styles.main}>
                <div className={Styles.container}>
                    {isValid || <h2>Invalid search</h2>}
                    {isValid && restaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant._id} name={restaurant.name} type={restaurant.type} imageUrl={restaurant.imageUrl} rating={restaurant.rating} cost={restaurant.cost} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default search

export const getServerSideProps = async (context) => {
    const query = context.params.query;
    let restaurants
    try {
        const res = await Restaurant.searchByQuery(query);
        restaurants = res
    } catch (e) {
        restaurants = null
        console.error(e)
    }

    const isValid = (restaurants) ? true : false

    return {
        props: {
            query,
            restaurants: JSON.parse(JSON.stringify(restaurants)),
            isValid
        }
    }
}