import React, {useEffect, useState} from 'react';
import {orderAPI} from "@/api/api";
import OrderHeader from "@/components/order/order-header/OrderHeader";
import OrderCard from "@/components/order/order-card/OrderCard";
import styles from '../../styles/page/order.module.scss'
import {ICart} from "@/models/ICart";
import {getSession} from "next-auth/react";

interface IRes {
    data: ICart[]
}

const PreviousOrder = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getCompleteOrdersHandler = async () => {
            const {data} = await orderAPI.getCompleteOrders()
            setOrders(data)
            setLoading(false)
        }
        getCompleteOrdersHandler()
    }, [])

    // Берет массив объектов, который пришел с бэка и сортирует данные по id
    const map = orders.reduce((acc, cur) => {
        acc[cur.id] = acc[cur.id] || {
            data: []
        };
        acc[cur.id].data.push(cur);
        return acc;
    }, {})

    const result = Object.values(map);

    // Удаляет повторения из массива (если товар 1, но несколько штук, то анимация запускаться не будет)
    //@ts-ignore
    result.map((resItem: IRes) => {
        resItem.data = resItem.data.filter((value, index, self) =>
                index === self.findIndex((t: {uniqCode: number}) => (
                    t.uniqCode === value.uniqCode
                ))
        )
    })


    return orders.length === 0 ? (
        <h1 className={styles.order__empty}>У вас нет полученых заказов</h1>
    ) : (

        <div className={styles.order}>
            <OrderHeader title={'Ваши заказы.'} subtitle={'Уже получены'}/>
            <div className={styles.order__wrapper}>
                {/*@ts-ignore*/}
                {result.map((item: IRes) => {
                    const {id} = item.data[0]
                    return (
                        <OrderCard
                            key={id}
                            status={'complete'}
                            id={id}
                            allProduct={item.data}
                        />
                    )
                })
                }
            </div>
        </div>
    );
};

export default PreviousOrder;


export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { session }
    }
}