import React from 'react';
import styles from '../../styles/page/email.module.scss'
import main_img from '../../assets/image/service/black-friday-Email 1.svg'
import Image from 'next/image'
import protect_icon from '../../assets/image/icon/manage-protection.svg'
import support_icon from '../../assets/image/icon/police.svg'
import Link from "next/link";

const EmailConfirm = () => {
    return (
        <div className={styles.email}>
            <Image src={main_img} className={styles.email__img} alt=""/>
            <h1 className={styles.email__title}>Ваша почта успешно подтверждена</h1>
            <div className={styles.email__item}>
                <Image src={protect_icon} alt={""} />
                <div className={styles.email__text}>
                    <h4>Ваши данные под защитой</h4>
                    <p>Мы отвечаем за конфиденциальность и безопасность ваших данных в сервисах Union.</p>
                </div>
            </div>
            <div className={styles.email__item}>
                <Image src={support_icon} alt={""} />
                <div className={styles.email__text}>
                    <h4>Мы всегда на связи</h4>
                    <p>Если у вас есть вопросы, свяжитесь с нами через службу поддержки в Telegram, и мы обязательно вам ответим.</p>
                </div>
            </div>
            <Link href="/" className={styles.email__btn}>К покупкам</Link>
        </div>
    );
};

export default EmailConfirm;