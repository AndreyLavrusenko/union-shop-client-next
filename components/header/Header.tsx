import logo from '../../assets/image/logo/header_logo.svg'
import Link from "next/link";
import Image from "next/image";

import styles from './header.module.scss'

const Header = () => {
    return (
        <div className={styles.header}>
            <Link href="/">
                <Image src={logo} alt="Union logo"/>
            </Link>
        </div>
    )
}

export default Header;