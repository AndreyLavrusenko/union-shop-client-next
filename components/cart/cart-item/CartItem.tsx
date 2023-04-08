import React, {useEffect, useState} from 'react';
import {ICart} from "@/models/ICart";
import {cartAPI} from "@/api/api";
import Link from "next/link";
import styles from '../../../styles/page/cart.module.scss'

interface IProps {
    cart: ICart,
    handleDelete: (id: number) => {}
    plusProductQuantity: (id: number) => {}
    minusProductQuantity: (id: number) => {}
}

const CartItem = ({cart, handleDelete, plusProductQuantity, minusProductQuantity,}: IProps) => {

    const [product, setProduct] = useState<ICart>(null)
    const color = cart.color
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getProductInfo = async () => {
            // Получение общей информации о товаре из таблицы product
            const data = await cartAPI.getItemFromCart(cart.uniqCode)
            setProduct(data)
            setLoading(false)
        }

        getProductInfo()

    }, [cart])

    if (loading) return null

    return (
        <div className={styles.cart__info} key={cart.id}>
            <div className={styles.cart__info__wrapper}>
                <div className={styles.cart__info__block}>
                    <img src={process.env.NEXT_PUBLIC_API + product.image} alt=""/>
                </div>
                <div className={styles.cart__info__main}>
                    <div>
                        <div className={styles.cart__left}>
                            {cart.quantity > cart.count
                                ? <Link href={`/product/${product.id}`} className={styles.cart__left__title}>
                                    <span> (нет в наличии)</span></Link>

                                : <Link href={`/product/${product.id}`}
                                        className={styles.cart__left__title}>{product.title}</Link>
                            }

                            <div>
                                <div className={styles.cart__left__desc}>{product.description} -</div>
                                <div className={styles.cart__left__desc}>{cart.productName}</div>
                            </div>
                            <div className={styles.cart__left__option}>
                                {color === ""
                                    ? null
                                    : <div className={styles.cart__left__color} style={{background: color}}/>
                                }
                                {cart.size === ""
                                    ? null
                                    : <div className={styles.cart__left__size}>{cart.size}</div>
                                }
                            </div>
                        </div>

                    </div>

                    <div className={styles.cart__info__count}>
                        <button onClick={() => minusProductQuantity(cart.id)}>&#8722;</button>
                        {cart.quantity}
                        <button onClick={() => plusProductQuantity(cart.id)}>&#43;</button>
                    </div>

                    <div>
                        <div className={styles.cart__right}>
                            { cart.discount
                                ? <del className={[styles.cart__right__price, styles.cart__right__price__sale].join(' ')}>
                                    {cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₽"}
                                </del>
                                : null
                            }
                            { cart.discount
                                ? <div
                                    className={styles.cart__right__price}>{cart.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₽"}
                                </div>
                                : <div
                                    className={styles.cart__right__price}>{cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₽"}
                                </div>
                            }
                            <button
                                className={styles.cart__right__delete}
                                onClick={() => handleDelete(cart.id)}
                            >Удалить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;