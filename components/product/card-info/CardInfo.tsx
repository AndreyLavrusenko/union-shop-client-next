import React, {useEffect, useState} from 'react';
import {IProduct} from "@/models/IProduct";
import {IProductInfo} from "@/models/IProductInfo";
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {cartAPI} from "@/api/api";
import {useSession} from "next-auth/react";
import Modal from "@/components/modal/Modal";
import {useRouter} from "next/router";
import CardToggle from "@/components/product/card-info/card-toggle/CardToggle";
import Image from "next/image";
import Notification from "@/components/notification/Notification";

import styles from './cardinfo.module.scss'


interface IProps {
    setRerenderCart: (status: boolean) => void
    rerenderCart: boolean
    isAuth: any
    productInfo: IProductInfo[]
    productData: IProduct,
}


const CardInfo = ({setRerenderCart, rerenderCart, isAuth, productInfo, productData}: IProps) => {
    const dispatch = useAppDispatch()
    const {error, isLoading} = useAppSelector(state => state.cart)

    const router = useRouter()

    // Отвечает за всплывающее уведомление
    const [toastActive, setToastActive] = useState(false)

    const {data: user} = useSession()

    // Картинки с размерами товара
    let sizeImg = []
    if (productData.sizeImg.length > 1) {
        //@ts-ignore
        sizeImg = JSON.parse(productData.sizeImg)
    }


    // Изначальный размер
    const [activeSize, setActiveSize] = useState(productInfo[0].size)
    const [activeColor, setActiveColor] = useState(productInfo[0].color)

    // Массив для цветов
    const [colorArr, setColorArr] = useState([])
    const [loading, setLoading] = useState(true)

    const [showColor, setShowColor] = useState(null)
    const [showSize, setShowSize] = useState(null)

    const [colorError, setColorError] = useState(false)
    const [modal, setModal] = useState(false)

    let price: string | number = null
    let title_product: IProductInfo = null

    useEffect(() => {
        // ОБнуляем выбранный цвет
        let FLAG = false

        productInfo.filter(item => {
            if (item.size === activeSize && !FLAG) {
                setActiveColor(item.color);
                FLAG = true
            }
        })

        colorArr.length = 0;
        title_product = null;

        // Проверяет массив, есть ли в нем цвет и размер, если они пустые, то не будут выводиться детали для выбора
        const isColor = productInfo.some(item => item.color !== '')
        const isSize = productInfo.some(item => item.size !== '')
        setShowColor(isColor)
        setShowSize(isSize)

        setLoading(false)

    }, [activeSize])

    // При смене размера записыавет в массив новые цвета
    const setNewColorArr = () => {
        colorArr.length = 0

        if (!showSize) {
            productInfo.map(item => colorArr.push(item))
        } else {
            productInfo.find(item => {
                if (item.size === activeSize) {
                    colorArr.push(item)
                }
            })
        }

        return colorArr
    }

    setNewColorArr()

    // Меняет цену взависимоти от цвета и размера
    const setPriceHandler = () => {
        if (showSize && showColor) {
            if (activeColor && activeSize) {
                productInfo.map(item => {
                    if (item.color === activeColor && item.size === activeSize) {
                        price = item.price
                    }
                })
            }
        }

        if (showColor && !showSize) {
            if (activeColor) {
                productInfo.map(item => {
                    if (item.color === activeColor) {
                        price = item.price
                    }
                })
            }
        }

        if (!showColor && !showSize) {
            productInfo.map(item => {
                price = item.price
            })
        }

    }

    setPriceHandler()

    // Добавление товара в корзину
    const addToCart = async () => {
        if (!isAuth) {
            setModal(true)
        }


        // Если для выбора доступен и цвет и размер
        if (showColor && showSize) {
            if (activeColor && activeSize) {
                const id = productData.id
                title_product = productInfo.find(item => {
                    if (item.color === activeColor && item.size === activeSize) return item
                })

                const name = title_product.title_product


                await cartAPI.setProduct({
                    name,
                    price,
                    id,
                    color: activeColor,
                    size: activeSize
                    // @ts-ignore
                }, dispatch, user?.user?.id ?? '')

                setActiveSize(productInfo[0].size)
                setActiveColor(productInfo[0].color)
                setColorError(false)
                setToastActive(true)
            } else {
                setColorError(true)
            }
        }

        // Если для выбора доступен только цвет
        if (showColor && !showSize) {
            if (activeColor) {
                const id = productData.id
                title_product = productInfo.find(item => {
                    if (item.color === activeColor && item.size === activeSize) return item
                })

                const name = title_product.title_product

                // @ts-ignore
                await cartAPI.setProduct({
                    name,
                    price,
                    id,
                    color: activeColor,
                    size: activeSize
                    // @ts-ignore
                }, dispatch, user?.user?.id ?? '')

                setActiveSize(productInfo[0].size)
                setActiveColor(productInfo[0].color)
                setColorError(false)
                setToastActive(true)
            } else {
                setColorError(true)
            }
        }

        // Если для выбора ничего не доступно
        if (!showColor && !showSize) {
            const id = productData.id
            title_product = productInfo.find(item => {
                if (item.color === activeColor && item.size === activeSize) return item
            })

            const name = title_product.title_product

            // @ts-ignore
            await cartAPI.setProduct({
                name,
                price,
                id,
                color: activeColor,
                size: activeSize
                // @ts-ignore
            }, dispatch, user?.user?.id ?? '')

            setActiveColor(productInfo[0].color)
            setColorError(false)
            setToastActive(true)
        }

        setRerenderCart(!rerenderCart)
    }

    if (showColor) {
        if (activeColor) {
            try {
                title_product = productInfo.find(item => {
                    if (item.color === activeColor && item.size === activeSize) return item
                })
            } catch (err) {
                title_product = null
            }
        }
    } else {
        title_product = productInfo[0]
    }

    return (
        <div className={styles.cardinfo}>
            {/*@ts-ignore*/}
            <Notification color={"#E2F5EA"} sendColor={"#6FCF97"} text={"Товар добавлен в корзину"}
                          toastActive={toastActive} setToastActive={setToastActive} isError={error}/>
            <div className={styles.cardinfo__new}>{productData.isNew ? "Новинка" : null}</div>
            <div className={styles.cardinfo__title}>{productData.title}</div>
            <div className={styles.cardinfo__desc}>{productData.description} -</div>
            <div
                className={styles.cardinfo__desc__title}
                style={title_product ? {opacity: 1} : {opacity: 0}}>
                {title_product ? title_product.title_product : "-------"}
            </div>

            {/* Вывод цены если есть скидка */}
            {productInfo[0].discount
                ?
                <div style={{display: "flex"}}>

                    <del style={{textDecoration: 'line-through', textDecorationColor: 'red'}}
                         className={styles.cardinfo__price}>
                        {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"}
                    </del>

                    <div className={styles.cardinfo__price} style={{marginLeft: '10px'}}>
                        {price
                            ? productInfo[0].discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
                            : "-------"
                        }
                    </div>

                </div>

                // Вывод цена
                : <div
                    className={styles.cardinfo__price}
                    style={price ? {opacity: 1} : {opacity: 0}}
                >
                    {price
                        ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽"
                        : "-------"
                    }
                </div>
            }


            {/* Если у товара нет размера, то ничего не выводит */}
            {!showSize
                ? null
                : <div>
                    <div className={styles.cardinfo__color}>Размер</div>

                    <div className={styles.cardinfo__color__select}>
                        {/*@ts-ignore*/}
                        {[...new Set(productInfo.map(item => item.size))].map((item, i) => {
                            return <div
                                key={i}
                                className={item === activeSize
                                    ? styles.cardinfo__size__item + " " + styles.active__size
                                    : styles.cardinfo__size__item
                                }
                                onClick={() => {
                                    setActiveSize(item)
                                    setNewColorArr()
                                }}
                            >{item}</div>
                        })}
                    </div>
                </div>
            }

            {/* Если у товара нет цвета, то ничего не выводит */}
            {!showColor
                ? null
                : <>
                    <div
                        className={colorError
                            ? styles.cardinfo__color + " animate__animated animate__shakeX"
                            : styles.cardinfo__color + " animate__animated"
                        }
                        style={colorError
                            ? {color: "#D62E20"}
                            : {color: "black"}}
                    >Цвет
                    </div>

                    <div className={styles.cardinfo__color__select}>
                        {colorArr.map((item, i) => {
                            return <div
                                key={i}
                                className={item.color.trim() === activeColor
                                    ? styles.cardinfo__color__item + " " + styles.active__color
                                    : styles.cardinfo__color__item
                                }
                                style={{backgroundColor: item.color}}
                                onClick={() => {
                                    setActiveColor(item.color.trim())
                                    setPriceHandler()
                                }}
                            />
                        })}
                    </div>
                </>
            }


            <button
                className={styles.cardinfo__button + " " + styles.cardinfo__buy}
                onClick={() => {
                    addToCart().then(() => {
                        if (isAuth) router.push('/cart')
                    })
                }}
            >Купить
            </button>
            <button
                onClick={addToCart}
                disabled={isLoading}
                className={styles.cardinfo__button + " " + styles.cardinfo__cart}>{isLoading ? "Добавление..." : "В корзину"}
            </button>

            <CardToggle title="О товаре" data={productData.about}/>
            <CardToggle title="Рекомендации по уходу" data={productData.recommend}/>
            <CardToggle title="Размерная сетка" data={productData.sizeGrid}/>

            <div className={styles.cardinfo__horizontal}/>

            {/* Картинки с размерами */}
            <div className={styles.cardinfo__size}>
                {sizeImg.map((item: string, i: number) => (
                    <div key={i}>
                        <Image src={process.env.NEXT_PUBLIC_API + item} alt="" objectFit={"cover"} layout={"fill"}
                               className={styles.cardinfo__size__img}/><br/>
                    </div>
                ))}
            </div>
            <Modal active={modal} setModalActive={setModal}/>
        </div>

    )
};

export default CardInfo;