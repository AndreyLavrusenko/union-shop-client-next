import React from 'react';
import styles from '../../styles/page/delivery.module.scss'
import DeliveryTypeComponent from "@/components/create-order/create-pages/DeliveryType";

const DeliveryType = () => {
    return (
        <div className={styles.create}>
            <DeliveryTypeComponent />
        </div>
    );
};

export default DeliveryType;