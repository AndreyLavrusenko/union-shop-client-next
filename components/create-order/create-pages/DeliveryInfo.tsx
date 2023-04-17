import React, {useEffect, useState} from 'react';
import CreateTitle from "../create-title/CreateTitle";
import {useForm} from "react-hook-form";
import styles from '../../../styles/page/delivery.module.scss'
import {useRouter} from "next/router";
import {authAPI, cartAPI, orderAPI, profileAPI} from "@/api/api";
import {IUserData} from "@/models/IUserData";
import {useSession} from "next-auth/react";


const DeliveryInfoComponent = () => {
    const router = useRouter()
    const {data: user} = useSession()
    const {register, formState: {errors}, handleSubmit} = useForm()
    const [isChecked, setIsChecked] = useState(false)
    const [subscribeNews, setSubscribeNews] = useState(true)
    const [isEmailConfirm, setIsEmailConfirm] = useState(true);
    const [userData, setUserData] = useState({
        fullName: "",
        city: "",
        country: "",
        address: "",
        phone: "",
        index: "",
        region: "",
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
                })
            }

        }
        getUserInfo()
    }, [])

    useEffect(() => {
        (async function (){
            const data = await profileAPI.getUserEmail()
            if (data.data[0] && data.data.length !== 0) {
                if (data.data[0].otherServiceLogin === 1 || data.data[0].confirmed === 1) {
                    setIsEmailConfirm(true)
                } else {
                    setIsEmailConfirm(false)
                }
            }
        }())
    }, []);

    const onSubmit = async (e: any, userData: IUserData) => {
        e.preventDefault()

        userData.email = user.user.email

        // Записывает данные пользователя в бд после нажатия на кнопку
        await orderAPI.setUserInfoDelivery(JSON.stringify(userData), user.user.email, subscribeNews)
        return router.push("delivery-pay");
    }

    const onChange = (e: any) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <CreateTitle subtitle={"Введите ваше имя и адрес:"} title={"Куда отправить ваш заказ?"}/>
            {!isEmailConfirm ? <h2  onClick={() => router.push('/profile')} className={styles.cart__header__email}>Для оформления заказа подтвердите email</h2> : null}
            <div className={styles.create__order}>
                <form
                    style={{marginTop: '20px'}}
                    onSubmit={e => onSubmit(e, userData)}
                    className={styles.order__form}
                >
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
                        <input
                            checked={isChecked}
                            onClick={() => setIsChecked(prev => !prev)}
                            required
                            className={styles.custom__checkbox}
                            type="checkbox"
                            id="conditions"
                            name="conditions"
                            value="conditions"
                        />
                        <label htmlFor="conditions">
                            Я принимаю условия: Условия доставки и оплаты / Shipping and Payment, Согласие на обработку
                            персональных данных / Consent to the Processing of Personal Data</label>
                    </div>

                    <div className="checkbox">
                        <input
                            {...register("news")}
                            checked={subscribeNews}
                            onClick={() => setSubscribeNews(prev => !prev)}
                            className={styles.custom__checkbox}
                            type="checkbox"
                            id="news"
                            name="news"
                            value="news"
                        />
                        <label htmlFor="news">
                            Подписаться на новости и эксклюзивные предложения
                        </label>
                    </div>

                    <button
                        disabled={!isChecked || !isEmailConfirm}
                        className={isChecked && isEmailConfirm
                            ? styles.order__form__buy
                            : styles.delivery_info_disabled + ' ' + styles.order__form__buy
                        }
                        type="submit"
                    >Продолжить
                    </button>

                </form>


            </div>
        </div>
    );
};

export default DeliveryInfoComponent;