import FoodItem from './FoodItem'
import Styles from '../styles/components/FoodGroup.module.scss'

const FoodGroup = ({ name, foodItems, id }) => {

    return (
        <div>
            <h3 className={Styles.title} id={id}>{name}</h3>
            {foodItems.map((item, idx) => (
                <FoodItem key={idx} name={item.name} description={item.description} cost={item.cost} imageUrl={item.imageUrl} quantity={item.quantity} />
            ))}
        </div>
    )
}

export default FoodGroup
