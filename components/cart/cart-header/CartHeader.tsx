import React from 'react';
import Link from "next/link";
import {ICart} from "@/models/ICart";
import styles from '../../../styles/page/cart.module.scss'

interface IProps {
    myCart: ICart[],
    availableBuy: boolean
}

const CartHeader = ({myCart, availableBuy}: IProps) => {
    const price = myCart.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity
    }, 0)

    return (
        <div className={styles.cart__header}>
            <h1 className={styles.cart__header__title}>Общая сумма корзины <span>{price} ₽.</span></h1>
            <div className={styles.cart__header__desc}>Бесплатная доставка</div>
            {availableBuy
                ? <Link style={{ textDecoration: "none"}} href="delivery-method">
                    <button className={styles.cart__header__button}>Оформить заказ</button>
                </Link>
                : <button style={{ textDecoration: "none", backgroundColor: "#0707e1", cursor: "not-allowed"}} className={styles.cart__header__button}>Доступны не все товары</button>
            }

            <div className={styles.cart__header__line}/>
        </div>
    );
};

export default CartHeader;