import React, {useEffect, useState} from 'react';
import StatusDetailsTitle from "./StatusDetailsTitle";
import {IStatusResult} from "@/models/IStatus";
import styles from '../../../styles/page/status.module.scss'

interface IProps {
    orderDetails: IStatusResult[]
}

interface IDelivery {
    country: string
    city: string
    address: string
    index: string
    fullName: string
    email: string
    phone: string
}

const StatusDetails = ({orderDetails}: IProps) => {

    //@ts-ignore
    const [deliveryInfo, setDeliveryInfo] = useState<IDelivery>([])

    useEffect(() => {
        setDeliveryInfo(JSON.parse(orderDetails[0].userInfo))
    }, [])


    const total = orderDetails[0].total
    const deliveryPrice = orderDetails[0].deliveryPrice
    const sale = orderDetails[0].sale ? orderDetails[0].sale : 0

    return (
        <div className={styles.status__details}>
            <div>

                <div className={styles.status__details__info}>
                    <StatusDetailsTitle title="Доставка">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.0009 13.4314C12.4106 13.4314 12.8163 13.3507 13.1948 13.1939C13.5734 13.0371 13.9173 12.8073 14.207 12.5176C14.4968 12.2279 14.7266 11.8839 14.8834 11.5054C15.0402 11.1268 15.1209 10.7211 15.1209 10.3114C15.1209 9.90168 15.0402 9.49597 14.8834 9.11743C14.7266 8.7389 14.4968 8.39495 14.207 8.10523C13.9173 7.81551 13.5734 7.5857 13.1948 7.4289C12.8163 7.27211 12.4106 7.19141 12.0009 7.19141C11.1734 7.19141 10.3798 7.52012 9.79469 8.10523C9.20957 8.69035 8.88086 9.48393 8.88086 10.3114C8.88086 11.1389 9.20957 11.9325 9.79469 12.5176C10.3798 13.1027 11.1734 13.4314 12.0009 13.4314V13.4314Z" stroke="black" strokeWidth="1.5"/>
                            <path d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C14.6318 21.4735 13.3395 21.9952 11.9947 21.9952C10.65 21.9952 9.35763 21.4735 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49V8.49Z" stroke="black" strokeWidth="1.5"/>
                        </svg>
                    </StatusDetailsTitle>
                    <p>{deliveryInfo.country} {deliveryInfo.city} {deliveryInfo.address} {deliveryInfo.index}</p>
                </div>

                <div className={styles.status__details__info}>
                    <StatusDetailsTitle title="Получатель">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1198 12.7805C12.0401 12.7705 11.9595 12.7705 11.8798 12.7805C11.0317 12.7519 10.228 12.3949 9.63831 11.7847C9.04866 11.1745 8.71929 10.359 8.71977 9.51047C8.71977 7.70047 10.1798 6.23047 11.9998 6.23047C12.8592 6.22898 13.6848 6.56528 14.2986 7.16688C14.9124 7.76847 15.2652 8.58716 15.2809 9.44646C15.2966 10.3058 14.9741 11.1368 14.3827 11.7605C13.7914 12.3842 12.9787 12.7505 12.1198 12.7805V12.7805ZM18.7398 19.3805C16.902 21.0695 14.4958 22.0049 11.9998 22.0005C9.39977 22.0005 7.03977 21.0105 5.25977 19.3805C5.35977 18.4405 5.95977 17.5205 7.02977 16.8005C9.76977 14.9805 14.2498 14.9805 16.9698 16.8005C18.0398 17.5205 18.6398 18.4405 18.7398 19.3805V19.3805Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </StatusDetailsTitle>
                    <p>{deliveryInfo.fullName}</p>
                    <p>{deliveryInfo.email}</p>
                    <p>{deliveryInfo.phone}</p>
                </div>

            </div>
            <div>

                <div className={styles.status__details__info}>
                    <StatusDetailsTitle title="Оплата">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 8.50391H22M6 16.5039H8M10.5 16.5039H14.5" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.44 3.50391H17.55C21.11 3.50391 22 4.38391 22 7.89391V16.1039C22 19.6139 21.11 20.4939 17.56 20.4939H6.44C2.89 20.5039 2 19.6239 2 16.1139V7.89391C2 4.38391 2.89 3.50391 6.44 3.50391V3.50391Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </StatusDetailsTitle>

                    <div className={styles.status__pay}>
                        <div className={styles.status__pay__info}>
                            <div className={styles.status__pay__left}>Товары</div>
                            <div>{total} ₽</div>
                        </div>
                        <div className={styles.status__pay__info}>
                            <div className={styles.status__pay__left}>Доставка</div>
                            <div>{deliveryPrice} ₽</div>
                        </div>
                        <div className={styles.status__pay__info}>
                            <div className={styles.status__pay__left}>Скидка</div>
                            <div>{orderDetails[0].sale ? sale + '₽' : 0}</div>
                        </div>
                        <div className={styles.status__pay__info} style={{marginTop: '30px'}}>
                            <div className={styles.status__pay__left} style={{fontWeight: 700}}>Итого</div>
                            <div>{total + deliveryPrice - sale} ₽</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StatusDetails;