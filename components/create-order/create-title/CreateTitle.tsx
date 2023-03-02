import React, {useEffect, useState} from 'react';
import {orderAPI} from "@/api/api";
import styles from '../../../styles/page/delivery.module.scss'

interface IProps {
    title: string,
    subtitle: string,
    updatePrice?: boolean
}

const CreateTitle = ({title, subtitle, updatePrice}: IProps) => {
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getSum = async () => {
            const {data} = await orderAPI.getOrderSum()
            setTotal(data[0].total + data[0].deliveryPrice)
        }
        getSum()
    }, [updatePrice])


    return (
        <>
            <div className={styles.create__total}>Итог {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₽"}</div>
            <div className={styles.create__title}>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </>
    );
};

export default CreateTitle;