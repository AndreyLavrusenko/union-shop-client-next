import React, {useEffect} from 'react';
import CreateTitle from "../create-title/CreateTitle";
import {useRouter} from "next/router";
import {cartAPI, orderAPI} from "@/api/api";
import styles from '../../../styles/page/delivery.module.scss'
import {useAppDispatch} from "@/hook/redux";
import {setCartQuantity} from "@/redux/reducer/cartSlice";

const DeliveryPayComponent = () => {
    const router = useRouter()

    const dispatch = useAppDispatch()

    useEffect(() => {
        const getCartQuantity = async () => {
            const count = await cartAPI.getCartQuantity()

            if (count === 0) router.push("/cart");
        }
        getCartQuantity()
    }, [])


    const onBuy = async () => {
        const {data} = await orderAPI.getOrdersQuantity()

        if (data) {
            await orderAPI.setPerformedOrderStatus()
            dispatch(setCartQuantity(0))
            return router.push('/order')
        }

        return router.push('/cart')


    }

    return (
        <div>
            <CreateTitle subtitle={"Оплата"} title={"Введите ваше имя и адрес:"}/>
            <div className={styles.create__order}>
                <button onClick={onBuy}>Купить</button>
            </div>
        </div>
    );
};

export default DeliveryPayComponent;