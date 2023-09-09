import React, {useState} from "react";
import styles from "./slider.module.scss";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    image: string;
    background: string;
    images: string[];
    title: string;
}

const CardSlider = ({image, images, background, title}: IProps) => {
    const [activeImg, setActiveImg] = useState([]);
    const [isOpenGallery, setIsOpenGallery] = useState(false);

    // @ts-ignore
    const images_arr = JSON.parse(images);

    const getNewImg = (e: any) => {
        setActiveImg(e.target.src);
    };


    return (
        <div className={styles.cardslider}>
            <div className={styles.cardslider__main} style={{backgroundColor: background}}>
                {/*Главная картинка images*/}
                {/*@ts-ignore*/}
                <img className={styles.cardslider__main__img} src={activeImg.length > 0 ? activeImg : process.env.NEXT_S3_LINK + image} alt={title} />
            </div>
            {/*Картинки из массива*/}
            <div className={styles.cardslider__down}>
                <div className={styles.cardslider__down__item}>
                    <Image layout="fill" objectFit="contain" onClick={getNewImg} className={styles.cardslider__down__img} src={process.env.NEXT_S3_LINK + image} alt={title} />
                </div>


                {
                    isOpenGallery
                        ? images_arr.map((item: string, i: number) => (
                                <div key={i} className={styles.cardslider__down__item}>
                                    <Image layout="fill" objectFit="contain" onClick={getNewImg} className={styles.cardslider__down__img} src={process.env.NEXT_S3_LINK + item.trim()} alt=""/>
                                </div>
                            ))
                        : images_arr.slice(0,5).map((item: string, i: number) => (
                            <div key={i} className={styles.cardslider__down__item}>
                                <Image layout="fill" objectFit="contain" onClick={getNewImg} className={styles.cardslider__down__img} src={process.env.NEXT_S3_LINK + item.trim()} alt=""/>
                            </div>
                        ))
                }

            </div>

            {images_arr.length > 6
                ? <div className={styles.cardslider__show_more} onClick={() => setIsOpenGallery(!isOpenGallery)}>{isOpenGallery ? 'Скрыть': 'Показать еще'}</div>
                : null
            }



        </div>
    );
};

export default CardSlider;