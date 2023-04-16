import React, {useEffect} from 'react';
import {IProduct} from "@/models/IProduct";
import CardTitle from "@/components/card/card-helpers/CardTitle";
import CardItem from "@/components/card/card-helpers/CardItem";
import arrow_right from '../../assets/image/icon/arrow_right_slider.svg';
import arrow_left from '../../assets/image/icon/arrow_left_slider.svg';
import Image from 'next/image'

import styles from './card.module.scss'
import {JSXInternal} from "preact/src/jsx";
import ElementClass = JSXInternal.ElementClass;

interface IProps {
    products: IProduct[],
    title: string
    secondTitle: string
}

const Card = ({products, title, secondTitle}: IProps) => {

    function sideScroll(element: any,direction: any,speed: any,distance: any,step: any){
        let  scrollAmount = 0;
        const slideTimer = setInterval(function(){
            if(direction == 'left'){
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
        }, speed);
    }


    const slideLeft = () => {
        const slider = document.querySelector(`.${styles.stripe__slider}`);
        sideScroll(slider,'left',1,400,5);
    }

    const slideRight = () => {
        const slider = document.querySelector(`.${styles.stripe__slider}`)
        sideScroll(slider,'right',1,400,5);
    }

    useEffect(() => {
        const slider = document.querySelectorAll(`.${styles.stripe__slider}`)
        slider.forEach(item => {
            if (item.children.length - 2 < 3) {
                item.querySelectorAll<HTMLElement>(`:scope > .${styles.arrow}`).forEach(arrow => arrow.style.opacity = '0')
            }
        })
    }, []);

    return (
        <div className={styles.stripe}>
            <CardTitle title={title} secondTitle={secondTitle}/>
            <div className={styles.stripe__slider}>
                <Image onClick={slideLeft} className={[styles.arrow, styles.arrow_left].join(' ')} src={arrow_left} alt="left"/>
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
                <Image onClick={slideRight} className={[styles.arrow, styles.arrow_right].join(' ')} src={arrow_right} alt="left"/>
            </div>
        </div>
    )
};

export default Card;