import React, {useState} from 'react';
import styles from './slider.module.scss'
import Image from "next/image";

interface IProps {
    image: string
    background: string
    images: string[]
    title: string
}

const CardSlider = ({image, images, background, title}: IProps) => {
    const [activeImg, setActiveImg] = useState([])

    // @ts-ignore
    const images_arr = JSON.parse(images)

    const getNewImg = (e: any) => {
        setActiveImg(e.target.src)
    }

    console.log(activeImg)


    return (
        <div className={styles.cardslider}>
            <div className={styles.cardslider__main} style={{backgroundColor: background}}>
                {/*Главная картинка images*/}
                {/*@ts-ignore*/}
                <Image layout='fill' objectFit='contain' className={styles.cardslider__main__img} src={activeImg.length > 0 ? activeImg : process.env.NEXT_PUBLIC_API + image} alt={title} />
            </div>
            {/*Картинки из массива*/}
            <div className={styles.cardslider__down}>
                <div className={styles.cardslider__down__item}>
                    <Image layout='fill' objectFit='contain' onClick={getNewImg} className={styles.cardslider__down__img} src={process.env.NEXT_PUBLIC_API + image} alt={title} />
                </div>

                {images_arr.map((item: string, i: number) => (
                    <div key={i} className={styles.cardslider__down__item}>
                        <Image layout='fill' objectFit='contain' onClick={getNewImg} className={styles.cardslider__down__img} src={process.env.NEXT_PUBLIC_API + item.trim()} alt=""/>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default CardSlider;