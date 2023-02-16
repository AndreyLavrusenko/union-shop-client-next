import React from 'react';
import {IProduct} from "@/models/IProduct";
import FlipMove from "react-flip-move";
import CardItemShop from "@/components/all/all-card/CardItemShop";
import styles from '../../../styles/page/shop.module.scss'

interface IProps {
    products: IProduct[]
}

const AllCard = ({products}: IProps) => {
    return (
        <FlipMove className={styles.all__card}>
            {products.map(item => {
                return <CardItemShop
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    subtitle={item.description}
                    image={item.image}
                    isLogo={item.isLogo}
                    color={item.color}
                    subColor={item.subColor}
                    backgroundcolor={item.backgroundcolor}
                />
            })}
        </FlipMove>
    )
};

export default AllCard;