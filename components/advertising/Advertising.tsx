import React, {useEffect, useState} from 'react';
import styles from './advertising.module.scss'
import Image from "next/image";
import {productAPI} from "@/api/api";

const Advertising = () => {
    const [advertising, setAdvertising] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getAdvertisingFunc = async () => {
            const data = await productAPI.getAdvertising()
            setAdvertising(data)
            setLoading(false)
        }
        getAdvertisingFunc()
    }, [])

    return (
        <>
            {
                loading ? null
                    : <div className={styles.advertising}>
                        <div className={styles.advertising__wrapper}>
                            <div className={styles.advertising__left}>
                                <div className={styles.advertising__left__new}>Новинка</div>
                                <br/>
                                <div className={styles.advertising__left__title}>{advertising.advertising_text}</div>
                            </div>
                            <div className={styles.advertising__right}>
                                <Image width={100} height={100} src={advertising.advertising_img} alt="Наша коллекция"/>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Advertising;