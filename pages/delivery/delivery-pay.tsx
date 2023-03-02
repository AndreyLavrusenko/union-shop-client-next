import React from 'react';
import styles from '../../styles/page/delivery.module.scss'
import DeliveryPayComponent from "@/components/create-order/create-pages/DeliveryPay";


const DeliveryPay = () => {

    return (
        <div className={styles.create}>
            <DeliveryPayComponent />
        </div>
    );
};

export default DeliveryPay;