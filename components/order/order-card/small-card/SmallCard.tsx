import React from 'react';
import 'animate.css'
import styles from '@/styles/page/order.module.scss'
import process from "process";


interface IProps {
    title: string
    backgroundcolor: string
    color: string
    description: string
    image: string
    subColor: string
    isAnimation?: boolean
}

const SmallCard = ({title, backgroundcolor, color, description, image, subColor, isAnimation = true}: IProps) => {
    return (
        <div
            key={Math.floor(Math.random() * (10000 - 1 + 1) + 1)}
            className={styles.order__small}
            style={isAnimation
                ? {animation: '4s ease showCard', backgroundColor: backgroundcolor}
                : {backgroundColor: backgroundcolor, animation: '4s ease showOneCard'}
            }
        >
            <div className={styles.order__small__title} style={{color: color}}>{title}</div>
            <div className={styles.order__small__desc} style={{color: subColor}}>{description}</div>

            <div className={styles.order__small__img}>
                <img src={process.env.NEXT_S3_LINK + image} alt={title}/>
            </div>
        </div>
    );
};

export default SmallCard;