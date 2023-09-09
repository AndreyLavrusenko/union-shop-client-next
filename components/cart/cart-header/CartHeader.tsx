import React from 'react';
import Link from "next/link";
import styles from '../../../styles/page/cart.module.scss'
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

interface IProps {
    price: number,
    availableBuy: boolean,
    saveTotalPriceWithDiscount: () => {}
    isEmailConfirmed: boolean
}

const CartHeader = ({price, availableBuy, saveTotalPriceWithDiscount, isEmailConfirmed}: IProps) => {
    const router = useRouter()
    const {t: translate} = useTranslation('cart')
    const {t: translateCommon} = useTranslation('common')

    return (
        <div className={styles.cart__header}>
            <h1 className={styles.cart__header__title}>{translate("cart_title")} <span>{price} {translateCommon("currency")}.</span></h1>
            <div className={styles.cart__header__desc}>{translate("cart_subtitle")}</div>
            {!isEmailConfirmed ? <h2  onClick={() => router.push('/profile')} className={styles.cart__header__email}>{translate("confirm_email")}</h2> : null}
            {availableBuy
                ? <Link style={{ textDecoration: "none"}} onClick={saveTotalPriceWithDiscount} href="delivery/delivery-method">
                    <button className={styles.cart__header__button}>{translate("order_button")}</button>
                </Link>
                : <button style={{ textDecoration: "none", backgroundColor: "#0707e1", cursor: "not-allowed"}} className={styles.cart__header__button}>Доступны не все товары</button>
            }

            <div className={styles.cart__header__line}/>
        </div>
    );
};

export default CartHeader;