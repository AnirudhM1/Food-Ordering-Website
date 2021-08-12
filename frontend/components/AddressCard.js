import Styles from '../styles/components/AddressCard.module.scss'

const AddressCard = ({ element }) => {
    const address = element;
    return (
        <div className={Styles.container}>
            <h4>{address.title}</h4>
            <p>{address.text}</p>
            <div className={Styles.buttons}>
                <button>EDIT</button>
                <button>DELETE</button>
            </div>
        </div>
    )
}

export default AddressCard
