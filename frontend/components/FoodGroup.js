import FoodItem from './FoodItem'
import Styles from '../styles/components/FoodGroup.module.scss'

const FoodGroup = ({ name, foodItems, restaurant, id }) => {

    return (
        <div className={Styles.foodGroup}>
            <h3 className={Styles.title} id={id}>{name}</h3>
            {foodItems.map((item) => (
                <FoodItem key={item._id} id={item._id} restaurant={restaurant} name={item.name} description={item.description} cost={item.cost} imageUrl={item.imageUrl} quantity={item.quantity} />
            ))}
        </div>
    )
}

export default FoodGroup
