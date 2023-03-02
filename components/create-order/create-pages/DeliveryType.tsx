import React, {useEffect, useState} from 'react';
import CreateTitle from "../create-title/CreateTitle";
import styles from '../../../styles/page/delivery.module.scss'
import {useRouter} from "next/router";
import {cartAPI, orderAPI} from "@/api/api";

interface IProps {
    text: string
    price: number
    setIsSelected: (id: number) => void
    isSelected: string | number
    id: number
    setPrice: (price: number) => void
    setType: (text: string) => void
}


const DeliveryButton = ({text, price, setIsSelected, isSelected, id, setPrice, setType}: IProps) => {

    return (
        <div
            id={id.toString()}
            className={id === isSelected ? styles.delivery__type__link + " " + styles.delivery__type__active : styles.delivery__type__link}
            onClick={() => {
                setIsSelected(+id)
                setPrice(price)
                setType(text)
            }}
         >
            <p>{text}</p>
            <span>{price !== 0 ? price + " ₽" : null}</span>
        </div>
    )
}


const DeliveryTypeComponent = () => {
    const router = useRouter()


    useEffect(() => {
        const getCartQuantity = async () => {
            const count = await cartAPI.getCartQuantity()

            if (count === 0) router.push("/cart");
        }
        getCartQuantity()
    }, [])

    const [isSelected, setIsSelected] = useState(0)
    const [price, setPrice] = useState(0)
    const [type, setType] = useState("")

    const [updatePrice, setUpdatePrice] = useState(false)

    useEffect(() => {
        setUpdatePrice(!updatePrice)
    }, [])

    const setDeliveryType = async () => {
        await orderAPI.setNewDeliveryPrice(price, type)
        setUpdatePrice(!updatePrice)

        return router.push("delivery-info");
    }

    return (
        <div>
            <CreateTitle subtitle={"Выберите способ доставки:"} title={"Оформление заказа"} updatePrice={updatePrice}/>
            <div className={styles.create__order + " " + styles.delivery__type}>
                <DeliveryButton id={1} setPrice={setPrice} setType={setType} isSelected={isSelected} setIsSelected={setIsSelected} text={"Курьерская доставка по Санкт-Петербургу"} price={500}/>
                <DeliveryButton id={2} setPrice={setPrice} setType={setType} isSelected={isSelected} setIsSelected={setIsSelected} text={"Пункт выдачи заказов Boxberry"} price={257}/>
                <DeliveryButton id={3} setPrice={setPrice} setType={setType} isSelected={isSelected} setIsSelected={setIsSelected} text={"Бесплатная доставка"} price={0} />

                {isSelected
                    ? <button className={styles.delivery__type__button} onClick={setDeliveryType}>Продолжить</button>
                    : null
                }
            </div>
        </div>
    );
};

export default DeliveryTypeComponent;