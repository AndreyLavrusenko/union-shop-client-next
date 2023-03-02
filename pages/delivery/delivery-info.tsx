import React from 'react';
import styles from '../../styles/page/delivery.module.scss'
import DeliveryInfoComponent from "@/components/create-order/create-pages/DeliveryInfo";

const DeliveryInfo = () => {
    return (
        <div className={styles.create}>
            <DeliveryInfoComponent />
        </div>
    );
};

export default DeliveryInfo;