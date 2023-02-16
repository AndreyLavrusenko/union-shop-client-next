import React, {useState} from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import CardSlider from "@/components/product/card-slider/CardSlider";
import {productAPI} from "@/api/api";

import styles from './product.module.scss'
import {IProduct} from "@/models/IProduct";
import {IProductInfo} from "@/models/IProductInfo";
import CardInfo from "@/components/product/card-info/CardInfo";

interface IProps {
    productData: IProduct,
    productInfo: IProductInfo[],
}

const Product = ({productData, productInfo}: IProps) => {

    const {data: user} = useSession()

    // Перерисовка корзины при изменении кол-ва объектов
    const [rerenderCart, setRerenderCart] = useState(false)

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


export async function getServerSideProps({query}: any) {

    const {data} = await productAPI.getProductById(query.id)

    return {
        props: {
            productData: data.result[0],
            productInfo: data.info_result,
        }
    }

}