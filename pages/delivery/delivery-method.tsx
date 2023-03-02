import React from 'react';
import styles from '../../styles/page/delivery.module.scss'
import DeliveryMethodComponent from "@/components/create-order/create-pages/DeliveryMethod";


const DeliveryMethod = () => {
    return (
        <div className={styles.create}>
            <DeliveryMethodComponent />
        </div>
    );
};

export default DeliveryMethod;