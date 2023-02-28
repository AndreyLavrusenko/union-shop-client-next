import React, {useEffect, useState} from 'react';
import styles from '../styles/page/cart.module.scss'
import {cartAPI} from "@/api/api";
import {useSession} from "next-auth/react";
import CartHeader from "@/components/cart/cart-header/CartHeader";
import {ICart} from "@/models/ICart";
import CartItem from "@/components/cart/cart-item/CartItem";
import CartLetter from "@/components/cart/cart-letter/CartLetter";
import CartCheque from "@/components/cart/cart-cheque/CartCheque";


const Cart = () => {
    const {data: user} = useSession()

    const [availableBuy, setAvailableBuy] = useState(true)
    const [myCart, setMyCart] = useState<ICart[]>([])
    const [loading, setLoading] = useState(true)
    const [cartUpdate, setCartUpdate] = useState(true)
    const [updateDelete, setUpdateDelete] = useState(false)

    // Получение товаров в корзине и количество этого товара в наличии из таблицы all_products
    useEffect(() => {
        const getAllProduct = async () => {
            //@ts-ignore
            const res = await cartAPI.getCart()
            if (res.resultCode) {
                setMyCart([])
            } else {
                setMyCart(res)
            }

            setLoading(false)
        }

        getAllProduct()

    }, [user, cartUpdate])

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