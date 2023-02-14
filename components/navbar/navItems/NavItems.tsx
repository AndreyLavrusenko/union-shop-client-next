import React from 'react';
import Link from "next/link";

import styles from '../navbar.module.scss'
import {useRouter} from "next/router";

interface IProps {
    quantityState?: number
    closeNavbar: (status: boolean) => void,
    pathway: string,
    name: string,
    children: JSX.Element[] | JSX.Element
}

const NavItems = ({quantityState, pathway, name, closeNavbar, children}: IProps) => {
    const router = useRouter()

    return (
        <li className={styles.nav__list__item}>
            <Link
                href={pathway}
                className={router.pathname == pathway ? styles.nav__list__link + " " + styles.active : styles.nav__list__link}
                onClick={() => closeNavbar(false)}
                title={name}
            >
                {children}
                <span className={styles.nav__list__text}>
                    {name === "Корзина"
                        ? <div style={{display: "flex"}}>{name} <span className={styles.nav__quantity}><div>{quantityState}</div></span>
                        </div>
                        : name}
                </span>
            </Link>
        </li>
    );
};

export default NavItems;