import React from 'react';
import styles from '../../styles/page/status.module.scss'

interface IProps {
    orderId: string
    orderStatus: string
}

const StatusInfo = ({orderId, orderStatus}: IProps) => {
    switch (orderStatus) {
        case 'performed':
            orderStatus = 'Выполняется'
            break;
        case 'sent':
            orderStatus = 'Отправлено'
            break;
        case 'delivered':
            orderStatus = 'Доставлено'
            break;
        case "complete":
            orderStatus = 'Получено'
            break;
    }


    return (
        <div className={styles.status__info}>
            <div className={styles.status__info__title}>Заказ {orderId}</div>
            <div className={styles.status__info__subtitle}>{orderStatus}</div>
        </div>
    );
};

export default StatusInfo;