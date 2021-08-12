import Styles from '../styles/components/RestaurantCard.module.scss'

const RestaurantCard = ({ name, type, imageUrl, rating, cost }) => {
    console.log({ name })
    return (
        <div className={Styles.card}>
            <img src={imageUrl} alt={name} className={Styles.image} />
            <h3 className={Styles.name}>{name}</h3>
            <p className={Styles.type}>{type}</p>
            <div className={Styles.extras}>
                <div className={Styles.rating} style={{ background: (rating >= 4) ? "#48c479" : (rating >= 3) ? "#db7c38" : "red" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" >
                        <path fill="currentColor" className={Styles.star} d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                    <p>{rating}</p>
                </div>
                <div>
                    <p>&#8377;{cost}</p>
                </div>
            </div>
        </div>
    )
}

export default RestaurantCard