import Link from 'next/link'
import Styles from '../../styles/navbar/Nav.module.scss'


const Nav = ({ href, text, d }) => {
    return (
        <div className={Styles.nav}>
            <Link href={href}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g className={Styles.group}>
                        <path fill="currentColor" d={d} className={Styles.primary} />
                        <path fill="currentColor" d={d} className={Styles.secondary} />
                    </g>
                </svg>
            </Link>
            <span className={Styles.text}>{text}</span>
        </div>
    )
}

export default Nav
