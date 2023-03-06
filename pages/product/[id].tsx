import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import CardSlider from "@/components/product/card-slider/CardSlider";
import {cartAPI, productAPI} from "@/api/api";

import styles from './product.module.scss'
import {IProduct} from "@/models/IProduct";
import {IProductInfo} from "@/models/IProductInfo";
import CardInfo from "@/components/product/card-info/CardInfo";
import {setCartQuantity} from "@/redux/reducer/cartSlice";
import {useAppDispatch} from "@/hook/redux";

interface IProps {
    productData: IProduct,
    productInfo: IProductInfo[],
}

const Product = ({productData, productInfo}: IProps) => {

    const {data: user} = useSession()

    const dispatch = useAppDispatch()

    // Перерисовка корзины при изменении кол-ва объектов
    const [rerenderCart, setRerenderCart] = useState(false)

    // Обновляет кол-во товара в корзине
    useEffect(() => {
        const getCartCount = async () => {
            const data = await cartAPI.getCartQuantity()
            dispatch(setCartQuantity(data))
        }
        getCartCount()
    }, [rerenderCart])

    return (
        <div className={styles.card}>
            <CardSlider image={productData.image} background={productData.backgroundcolor} images={productData.image_arr} title={productData.title}/>
            <CardInfo
                setRerenderCart={setRerenderCart}
                rerenderCart={rerenderCart}
                isAuth={user}
                productInfo={productInfo}
                productData={productData}
            />
        </div>
    );
};

export default Product;


export const getServerSideProps = async ({query}: {query: {id: string}}) => {

    const data = await productAPI.getProductById(query.id)

    return {
        props: {
            productData: data[0],
            productInfo: [data[1]],
        }
    }
}
