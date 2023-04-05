import React, {useEffect} from 'react';
import {IProduct} from "@/models/IProduct";
import CardTitle from "@/components/card/card-helpers/CardTitle";
import CardItem from "@/components/card/card-helpers/CardItem";

import styles from './card.module.scss'

interface IProps {
    products: IProduct[],
    title: string
    secondTitle: string
}

const Card = ({products, title, secondTitle}: IProps) => {

    useEffect(() => {
        const element = document.querySelector(`.${styles.stripe__slider}`);

        const handleScroll = (event: any) => {
            event.preventDefault();

            element.scrollBy({
                left: event.deltaY < 0 ? -6 : 6,
            });
        }

        element.addEventListener('wheel', handleScroll);

        return () => {
            element.removeEventListener('wheel', handleScroll);
        };

    }, [])
    return (
        <div className={styles.stripe}>
            <CardTitle title={title} secondTitle={secondTitle}/>
            <div className={styles.stripe__slider}>
                {products.map(item => {
                    return <CardItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        subtitle={item.description}
                        image={item.image}
                        isLogo={item.isLogo}
                        color={item.color}
                        subColor={item.subColor}
                        backgroundcolor={item.backgroundcolor}/>
                })}
            </div>
        </div>
    )
};

export default Card;