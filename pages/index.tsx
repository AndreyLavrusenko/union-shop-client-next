import React from 'react';
import {productAPI} from "@/api/api";
import {IProduct} from "@/models/IProduct";
import Advertising from "@/components/advertising/Advertising";
import Card from "@/components/card/Card";


interface categoryItem {
    resultProduct: IProduct[]
    titles: string[]
}

interface IProps {
    topProduct: IProduct[],
    firstCategory: categoryItem,
    secondCategory: categoryItem,
    thirdCategory: categoryItem,
}

const Home = ({topProduct, firstCategory, secondCategory, thirdCategory}: IProps) => {
    return (
        <>
            <Card products={topProduct} title={"Лучшие товары."} secondTitle={"Зацените."}/>
            {firstCategory.resultProduct.length > 0
                ? <Card products={firstCategory.resultProduct} title={firstCategory.titles[0]}
                        secondTitle={firstCategory.titles[1]}/>
                : null
            }
            {secondCategory.resultProduct.length > 0
                ? <Card products={secondCategory.resultProduct} title={secondCategory.titles[0]}
                        secondTitle={secondCategory.titles[1]}/>
                : null
            }
            {thirdCategory.resultProduct.length > 0
                ? <Card products={thirdCategory.resultProduct} title={thirdCategory.titles[0]}
                        secondTitle={thirdCategory.titles[1]}/>
                : null
            }
            <Advertising/>
        </>
    );
};

export default Home;


export async function getServerSideProps() {

    const topProduct = await productAPI.renderTop()

    const categoryProduct = await productAPI.renderCategory()
    // @ts-ignore
    const {firstCategory: {data: firstCategory}, secondCategory: {data: secondCategory}, thirdCategory: {data: thirdCategory}} = categoryProduct

    return {
        props: {
            topProduct,
            firstCategory,
            secondCategory,
            thirdCategory,
        },
    }
}