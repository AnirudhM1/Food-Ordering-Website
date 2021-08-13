import Styles from '../styles/components/FoodItem.module.scss'

const FoodItem = ({ name, description, cost, imageUrl, quantity }) => {
    return (
        <div className={Styles.item}>
            <div className={Styles.text}>
                <p className={Styles.name}>{name}</p>
                <p classsName={Styles.description}>{description}</p>
                <div className={Styles.extras}>
                    <p className={Styles.cost}>&#8377;{cost}</p>
                    <p>Quantity: {quantity}</p>
                </div>
            </div>
            <div className={Styles.imageContainer}>
                <img className={Styles.image} src={imageUrl} alt={name} />
            </div>
        </div>
    )
}

export default FoodItem
