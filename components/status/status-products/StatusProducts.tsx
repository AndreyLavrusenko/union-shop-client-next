import React from 'react';
import StatusProductsCard from "./StatusProductsCard";
import styles from '../../../styles/page/status.module.scss'
import {IProductInfo} from "@/models/IProductInfo";

interface IProps {
    orderProducts: IProductInfo[]
}

const StatusProducts = ({orderProducts}: IProps) => {

    return (
        <div className={styles.status__product}>
            <div className={styles.status__product__content}>
                <div className={styles.status__product__count}>{orderProducts.length} товара</div>

                {orderProducts.map((order, i) => <StatusProductsCard key={i} orderDetails={order}/> )}

            </div>
        </div>
    )


};

export default StatusProducts;