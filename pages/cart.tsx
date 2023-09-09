import React, {useEffect, useState} from 'react';
import styles from '../styles/page/cart.module.scss'
import {authAPI, cartAPI, productAPI} from "@/api/api";
import {getSession, useSession} from "next-auth/react";
import CartHeader from "@/components/cart/cart-header/CartHeader";
import {ICart} from "@/models/ICart";
import CartItem from "@/components/cart/cart-item/CartItem";
import CartLetter from "@/components/cart/cart-letter/CartLetter";
import CartCheque from "@/components/cart/cart-cheque/CartCheque";
import {setCartQuantity} from "@/redux/reducer/cartSlice";
import {useAppDispatch} from "@/hook/redux";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


const Cart = () => {
    const {data: user} = useSession()

    const [availableBuy, setAvailableBuy] = useState(true)
    const [myCart, setMyCart] = useState<ICart[]>([])
    const [loading, setLoading] = useState(true)
    const [cartUpdate, setCartUpdate] = useState(true)
    const [updateDelete, setUpdateDelete] = useState(false)
    const [isEmailConfirmed, setEmailConfirmed] = useState(true)

    const dispatch = useAppDispatch()

    // Получение товаров в корзине и количество этого товара в наличии из таблицы all_products
    useEffect(() => {
        const getAllProduct = async () => {
            const res = await cartAPI.getCart()
            if (res.resultCode) {
                setMyCart([])
            } else {
                setMyCart(res)
            }

            setLoading(false)
        }

        getAllProduct().then(() => setUpdateDelete(!updateDelete))

    }, [user, cartUpdate])


    // Проверяет подтверждена ли почта или нет
    useEffect(() => {
        const getEmailConfirmedHandler = async () => {
            const res = await authAPI.getUserEmailConfirmed()
            if (res.status === 200) {
                setEmailConfirmed(!!res.data[0].confirmed)
            }
        }

        getEmailConfirmedHandler()
    }, [])


    // Получение кол-ва товаров в корзине
    useEffect(() => {
        const getCartCount = async () => {
            const data = await cartAPI.getCartQuantity()
            dispatch(setCartQuantity(data))
        }
        getCartCount()
    }, [cartUpdate, user, availableBuy])

    // При удалении элемента из корзина, смотрит остались ли там товары, которых нет в наличии
    // Если их нет, то разрешает покупку
    useEffect(() => {
        const arr: number[] = []

        myCart.map(item => {
            if (item.quantity <= item.count) {
                arr.push(1)
            } else {
                arr.push(0)
            }
        })

        if (arr.includes(0) || isEmailConfirmed === false) {
            setAvailableBuy(false)
        } else {
            setAvailableBuy(true)
        }

    }, [updateDelete, cartUpdate])

    // Удаление элемента из корзины
    const handleDelete = async (id: number) => {
        // Удаление товара из корзины
        await cartAPI.deleteItemFromCart(id)
        // Ререндер корзины
        setCartUpdate(!cartUpdate)
        setAvailableBuy(true)
    }

    const plusProductQuantity = async (id: number) => {
        await cartAPI.plusQuantity(id)
        // Ререндер корзины
        setCartUpdate(!cartUpdate)
    }

    const minusProductQuantity = async (id: number) => {
        await cartAPI.minusQuantity(id)
        // Ререндер корзины
        setCartUpdate(!cartUpdate)
    }

    const price = myCart.reduce((accumulator, object) => {
        return accumulator + object.price * object.quantity
    }, 0)

    const finalPrice = myCart.reduce((accumulator, object) => {
        return accumulator + (object.discount ?? object.price) * object.quantity
    }, 0)

    // Добавляет цену с учетом скидке по которой будет формироваться заказ
    const saveTotalPriceWithDiscount = async () => {
        await cartAPI.saveDiscountPrice(price)
    }

    return (
        <div className={styles.cart__main}>
            <CartHeader isEmailConfirmed={isEmailConfirmed} saveTotalPriceWithDiscount={saveTotalPriceWithDiscount} price={finalPrice} availableBuy={availableBuy}/>
            <div className={styles.cart__item__wrapper}>
                {myCart.map((item, i) => (
                    <CartItem
                        handleDelete={handleDelete}
                        minusProductQuantity={minusProductQuantity}
                        plusProductQuantity={plusProductQuantity}
                        key={i}
                        cart={item}/>
                ))}
                <CartLetter/>
                <CartCheque finalPrice={finalPrice} saveTotalPriceWithDiscount={saveTotalPriceWithDiscount} availableBuy={availableBuy} price={price}/>
            </div>
        </div>
    );
};

export default Cart


export async function getServerSideProps(context: any) {
    const session = await getSession(context)
    const { locale } = context;

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
            ...(await serverSideTranslations(locale, ['cart', 'navbar', 'common'])),
        }
    }
}