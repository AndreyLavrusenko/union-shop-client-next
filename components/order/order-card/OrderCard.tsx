import React, {useEffect, useState} from 'react';
import {ICart} from "@/models/ICart";
import Link from "next/link";
import styles from '../../../styles/page/order.module.scss'
import SmallCard from "@/components/order/order-card/small-card/SmallCard";

interface IProps {
    allProduct: ICart[],
    status: string
    id: number
    isDelivered?: boolean
}

const OrderCard = ({allProduct, status, id, isDelivered = false}: IProps) => {

    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentId(prev => {
                if (prev === allProduct.length - 1) {
                    return 0
                } else {
                    return prev + 1
                }
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [])


    if (status !== 'Выполнено') {
        switch (status) {
            case 'performed':
                status = 'Выполняется'
                break;
            case 'sent':
                status = 'Отправлено'
                break;
            case 'delivered':
                status = 'Доставлено'
                break;
            case "complete":
                status = 'Получено'
                break;
        }
    }

    return (
        <Link className={styles.order__card} href={`/order/${id}`}>
            <div className={styles.order__number}>Заказ {id}</div>
            <div className={styles.order__status}>{status}</div>

            {
                allProduct.length > 1
                    ?
                    <SmallCard
                        title={allProduct[currentId].title} description={allProduct[currentId].description}
                        color={allProduct[currentId].color}
                        subColor={allProduct[currentId].subColor}
                        backgroundcolor={allProduct[currentId].backgroundcolor}
                        image={allProduct[currentId].image}
                    />

                    :
                    <SmallCard
                        title={allProduct[0].title} description={allProduct[0].description}
                        color={allProduct[0].color}
                        subColor={allProduct[0].subColor} backgroundcolor={allProduct[0].backgroundcolor}
                        image={allProduct[0].image} isAnimation={false}
                    />
            }

            {
                status === 'complete'
                    ? <button className={styles.order__button + " " + styles.order__button__status}
                              style={{marginTop: '40px'}}>Детали заказа</button>
                    :
                    allProduct.length > 1
                        ? <>
                            <button className={styles.order__button + " " + styles.order__button__status}>Детали заказа
                            </button>
                            <button
                                className={styles.order__button + " " + styles.order__button__track}>{allProduct[currentId].trackNumber ? allProduct[currentId].trackNumber : "Скоро здесь будет трек номер"}</button>
                        </>
                        : <>
                            <button className={styles.order__button + " " + styles.order__button__status}>Детали заказа
                            </button>
                            <button
                                className={styles.order__button + " " + styles.order__button__track}>{allProduct[0].trackNumber ? allProduct[0].trackNumber : "Скоро здесь будет трек номер"}</button>
                        </>
            }

        </Link>
    );
};

export default OrderCard;