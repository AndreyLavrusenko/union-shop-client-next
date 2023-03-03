import React from 'react';
import styles from '../../../styles/page/status.module.scss'
import {IProductInfo} from "@/models/IProductInfo";

interface IProps {
    orderDetails: IProductInfo
}

const StatusProductsCard = ({orderDetails}: IProps) => {

    return (
        <div className={styles.status__card}>
            <div>
                <img src={process.env.NEXT_PUBLIC_API + orderDetails.image} alt=""/>
            </div>
            <div className={styles.status__card__data}>
                <div className={styles.status__card__name}>{orderDetails.title}</div>
                <div className={styles.status__card__list}>
                    <div className={styles.status__card__left}>Цвет</div>
                    <div className={styles.status__card__color} style={{backgroundColor: orderDetails.color}}>{orderDetails.color ? null : 'Универсальный'}</div>
                </div>
                <div className={styles.status__card__list}>
                    <div className={styles.status__card__left}>Размер</div>
                    <div>{orderDetails.size ? orderDetails.size : "Универсальный"}</div>
                </div>
                <div className={styles.status__card__list}>
                    <div className={styles.status__card__left}>Цена</div>
                    <div>{orderDetails.price} ₽</div>
                </div>

            </div>
        </div>
    );
};

export default StatusProductsCard;