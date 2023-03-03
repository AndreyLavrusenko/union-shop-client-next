import React from 'react';
import styles from '../../../styles/page/order.module.scss'

interface IProps {
    title: string,
    subtitle?: string,
}

const OrderHeader = ({title, subtitle}: IProps) => {
    return (
        <div className={styles.order__header}>
            <div className={styles.order__header__title}>{title}</div>
            <div className={styles.order__header__subtitle}>{subtitle}</div>
        </div>
    );
};

export default OrderHeader;