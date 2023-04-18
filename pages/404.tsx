import React from 'react';
import Image from 'next/image'
import notFoundImage from '../assets/image/service/404.svg'
import styles from '../styles/page/service.module.scss'
import {useRouter} from "next/router";

const NotFound = () => {
    const router = useRouter()

    return (
        <div className={styles.container}>
            <Image src={notFoundImage} alt={"404"}/>
            <h1>Старница не найдена</h1>
            <button onClick={() => router.push('/')}>Назад</button>
        </div>
    );
};

export default NotFound;