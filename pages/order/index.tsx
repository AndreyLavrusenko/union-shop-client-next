import React, {useEffect, useState} from 'react';
import {orderAPI} from "@/api/api";
import {ICart} from "@/models/ICart";
import Link from "next/link";
import styles from '../../styles/page/order.module.scss'
import OrderHeader from "@/components/order/order-header/OrderHeader";
import OrderCard from "@/components/order/order-card/OrderCard";


interface IRes {
    data: ICart[]
}

const Order = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const [isPerformed, setIsPerformed] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [isDelivered, setIsDelivered] = useState(false)

    useEffect(() => {
        const getOrders = async () => {
            const {data} = await orderAPI.getOrders()
            setOrders(data)
            setLoading(false)
        }

        getOrders()
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
    // @ts-ignore
    result.map((resItem: IRes) => {
        resItem.data = resItem.data.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.uniqCode === value.uniqCode
                ))
        )
    })

    // Проверяет какие блоки с заказами показывать
    useEffect(() => {
        orders.forEach(item => {
            if (item.performed === 'performed') {
                setIsPerformed(true)
            }

            if (item.performed === 'sent') {
                setIsSent(true)
            }

            if (item.performed === 'delivered') {
                setIsDelivered(true)
            }
        })
    }, [result])

    if (loading) return null;


    return orders.length === 0 ? (
        <h1 className={styles.order__empty}>У вас нет заказов</h1>
    ) : (

        <div className={styles.order}>

            {isPerformed
                ? <>
                    <OrderHeader title={'Ваши заказы.'} subtitle={'В процессе...'}/>
                    <div className={styles.order__wrapper}>
                        {/*@ts-ignore*/}
                        {result.map((item: IRes) => {
                            if (item.data[0].performed === 'performed') {
                                const {performed, id} = item.data[0]

                                return (
                                    <OrderCard
                                        key={id}
                                        status={performed}
                                        id={id}
                                        allProduct={item.data}
                                    />
                                )
                            }
                        })
                        }
                    </div>
                </>
                : null
            }

            {isSent
                ? <>
                    <OrderHeader title={'Ваши заказы.'} subtitle={'В пути...'}/>
                    <div className={styles.order__wrapper}>
                        {/*@ts-ignore*/}
                        {result.map((item: IRes) => {
                            if (item.data[0].performed === 'sent') {
                                const {performed, id} = item.data[0]

                                return (
                                    <OrderCard
                                        key={id}
                                        status={performed}
                                        id={id}
                                        allProduct={item.data}
                                    />
                                )
                            }
                        })
                        }
                    </div>
                </>
                : null
            }

            {isDelivered
                ? <>
                    <OrderHeader title={'Готовы к получению.'}/>
                    <div className={styles.order__wrapper}>
                        {/*@ts-ignore*/}
                        {result.map((item: IRes) => {
                            if (item.data[0].performed === 'delivered') {
                                const {performed, id} = item.data[0]

                                return (
                                    <OrderCard
                                        key={id}
                                        status={performed}
                                        id={id}
                                        allProduct={item.data}
                                        isDelivered={true}
                                    />
                                )
                            }
                        })
                        }
                    </div>
                </>
                : null
            }

            <Link className={styles.order__pastoreder} href={"/previous-order"}>Мои предыдущие заказы</Link>

        </div>
    );
};

export default Order;