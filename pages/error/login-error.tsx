import React from 'react';
import styles from '../../styles/page/email.module.scss'
import main_img from '../../assets/image/service/auth.svg'
import Image from 'next/image'
import protect_icon from '../../assets/image/icon/manage-protection.svg'
import Link from "next/link";

const LoginError = () => {
    return (
        <div className={styles.email}>
            <Image src={main_img} className={styles.email__img} alt=""/>
            <h1 className={styles.email__title}>Ошибка при входе в аккаунт</h1>
            <div className={styles.email__item}>
                <Image src={protect_icon} alt={""} />
                <div className={styles.email__text}>
                    <h4>В чем может быть проблема?</h4>
                    <p>Возможно, вы регистрировались на эту почту, не использую сервисы Google. Попробуйте ввести данные аккаунта вручную.</p>
                </div>
            </div>
            <Link href="/" className={styles.email__btn}>Еще раз</Link>
        </div>
    );
};

export default LoginError;