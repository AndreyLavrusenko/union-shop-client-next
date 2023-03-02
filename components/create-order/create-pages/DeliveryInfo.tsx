import React, {useEffect, useState} from 'react';
import CreateTitle from "../create-title/CreateTitle";
import {useForm} from "react-hook-form";
import styles from '../../../styles/page/delivery.module.scss'
import {useRouter} from "next/router";
import {authAPI, cartAPI, orderAPI} from "@/api/api";
import {IUserData} from "@/models/IUserData";


const DeliveryInfoComponent = () => {
    const router = useRouter()
    const {register, formState: {errors}, handleSubmit} = useForm()
    const [userData, setUserData] = useState({
        fullName: "",
        city: "",
        country: "",
        address: "",
        phone: "",
        index: "",
        region: "",
        email: ""
    })


    useEffect(() => {
        const getCartQuantity = async () => {
            const count = await cartAPI.getCartQuantity()

            if (count === 0) router.push("/cart");
        }
        getCartQuantity()
    }, [])


    // Проверяет совершал ли человек покупки и если да, то подставляет его данные в поля
    useEffect(() => {
        const getUserInfo = async () => {
            const {data} = await authAPI.getUserInfo()


            if (data[0].userInfo) {
                const user = JSON.parse(data[0].userInfo)

                setUserData({
                    fullName: user.fullName,
                    city: user.city,
                    country: user.country,
                    address: user.address,
                    phone: user.phone,
                    index: user.index,
                    region: user.region,
                    email: user.email
                })
            }

        }
        getUserInfo()
    }, [])



    const onSubmit = async (e: any, userData: IUserData) => {
        e.preventDefault()

        // Записывает данные пользователя в бд после нажатия на кнопку
        //@ts-ignore
        await orderAPI.setUserInfoDelivery(JSON.stringify(userData), userData.email)
        return router.push("delivery-pay");
    }

    const onChange = (e: any) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <CreateTitle subtitle={"Введите ваше имя и адрес:"} title={"Куда отправить ваш заказ?"}/>
            <div className={styles.create__order}>
                <form onSubmit={e => onSubmit(e, userData)} className={styles.order__form}>
                    <input
                        required
                        type="name"
                        value={userData.fullName}
                        onChange={onChange}
                        name="fullName"
                        placeholder="ФИО (укажите полностью фамилию и имя)"
                        className={styles.order__form__big + " " + styles.order__form__input}
                    />
                    <div style={{display: "flex"}} className={styles.info__order__block}>
                        <div>
                            <input
                                required
                                type="text"
                                value={userData.city}
                                onChange={onChange}
                                name="city"
                                placeholder="Город"
                                className={styles.order__form__middle + " " + styles.order__form__input}
                            />
                        </div>
                        <div>
                            <input
                                required
                                type="text"
                                name="country"
                                value={userData.country}
                                onChange={onChange}
                                placeholder="Страна"
                                className={styles.order__form__small + " " + styles.order__form__input}
                            />
                        </div>
                    </div>
                    <input
                        required
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={onChange}
                        placeholder="Улица, дом, квартира (укажите своей адрес полностью)"
                        className={styles.order__form__big + " " + styles.order__form__input}
                    />
                    <div style={{display: "flex"}} className="info__order-block">
                        <div>
                            <input
                                required
                                type="text"
                                name="phone"
                                onChange={onChange}
                                value={userData.phone}
                                placeholder="Телефон"
                                className={styles.order__form__middle + " " + styles.order__form__input}
                            />
                        </div>
                        <div>
                            <input
                                required
                                type="number"
                                name="index"
                                value={userData.index}
                                onChange={onChange}
                                placeholder="Почтовый индекс"
                                className={styles.order__form__small + " " + styles.order__form__input}
                            />
                        </div>
                    </div>
                    <input
                        required
                        type="text"
                        name="region"
                        value={userData.region}
                        onChange={onChange}
                        placeholder="Регион"
                        className={styles.order__form__big + " " + styles.order__form__input}
                    />


                    <span className={styles.order__form__label}>
                        Введите адрес своей электронной почты. <br/>
                        На этот адрес будут отправляться уведомления о статусе заказа.
                    </span>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={onChange}
                        required={true}
                        placeholder="Ваш адрес электронной почты"
                        className={styles.order__form__input + " " + styles.order__form__special}
                    />
                    <div/>

                    <span className={styles.order__form__label}>
                       Введите промокод
                    </span>

                    <div className={styles.order__form__promo}>
                        <input
                            {...register("promo")}
                            type="text"
                            name="promo"
                            className={styles.order__form__input + " " + styles.order__form__special}
                        />
                        <button type="button">Применить</button>
                    </div>
                    <p className={styles.order__form__error + " " + styles.order__promo__error}>Неверный промокод</p>

                    <div className={styles.checkbox}>
                        <input required className={styles.custom__checkbox} type="checkbox" id="conditions" name="conditions" value="conditions" />
                        <label htmlFor="conditions">
                            Я принимаю условия: Условия доставки и оплаты / Shipping and Payment, Согласие на обработку
                            персональных данных / Consent to the Processing of Personal Data</label>
                    </div>

                    <div className="checkbox">
                        <input {...register("news")} className={styles.custom__checkbox} type="checkbox" id="news" name="news" value="true" />
                        <label htmlFor="news">
                            Подписаться на новости и эксклюзивные предложения
                        </label>
                    </div>


                    <button className={styles.order__form__buy} type="submit">Продолжить</button>

                </form>


            </div>
        </div>
    );
};

export default DeliveryInfoComponent;