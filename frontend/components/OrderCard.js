import Styles from '../styles/components/OrderCard.module.scss'

const OrderCard = ({ element }) => {
    const order = element
    return (
        <div className={Styles.order}>
            <div className={Styles.restaurant}>
                {order.restaurant}
            </div>
            {order.food.map(({ item, count }, idx) => (
                <div key={idx} className={Styles.item}>
                    <div className={Styles.food}>
                        {item.name}
                    </div>
                    <div className={Styles.info}>
                        <div className={Styles.count}>
                            {count}
                        </div>
                        <div className={Styles.amount}>
                            &#8377;{item.cost * count}
                        </div>
                    </div>
                </div>
            ))}
            <div className={Styles.bill}>
                <div style={{ marginBottom: '1rem', fontWeight: 500, fontSize: '0.9rem' }}>Bill Details:</div>
                <div className={Styles.total}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem' }}>TOTAL:</div>
                    <div>&#8377;{order.total}</div>
                </div>
                <div>Delivered to: {order.address}</div>
            </div>
        </div>
    )
}

export default OrderCard
