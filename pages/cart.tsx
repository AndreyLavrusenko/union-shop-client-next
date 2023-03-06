import React, {useEffect, useState} from 'react';
import styles from '../styles/page/cart.module.scss'
import {cartAPI, productAPI} from "@/api/api";
import {useSession} from "next-auth/react";
import CartHeader from "@/components/cart/cart-header/CartHeader";
import {ICart} from "@/models/ICart";
import CartItem from "@/components/cart/cart-item/CartItem";
import CartLetter from "@/components/cart/cart-letter/CartLetter";
import CartCheque from "@/components/cart/cart-cheque/CartCheque";
import {setCartQuantity} from "@/redux/reducer/cartSlice";
import {useAppDispatch} from "@/hook/redux";


const Cart = () => {
    const {data: user} = useSession()

    const [availableBuy, setAvailableBuy] = useState(true)
    const [myCart, setMyCart] = useState<ICart[]>([])
    const [loading, setLoading] = useState(true)
    const [cartUpdate, setCartUpdate] = useState(true)
    const [updateDelete, setUpdateDelete] = useState(false)

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

        if (arr.includes(0)) {
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

    return (
        <div className={styles.cart__main}>
            <CartHeader myCart={myCart} availableBuy={availableBuy}/>
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
                <CartCheque availableBuy={availableBuy} myCart={myCart}/>
            </div>
        </div>
    );
};

export default Cart
