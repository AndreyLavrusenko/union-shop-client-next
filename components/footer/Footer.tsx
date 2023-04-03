import React, {useEffect, useState} from 'react';
import logo_blue from '../../assets/image/logo/logo_blue.svg'
import vk from '../../assets/image/icon/vk.svg'
import tg from '../../assets/image/icon/telegram.svg'
import yt from '../../assets/image/icon/youtube.svg'
import styles from './footer.module.scss'
import Link from "next/link";
import Image from "next/image";


interface IProps {
    copyright: string
}

const Footer = ({copyright}: IProps) => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__wrapper}>
                <div className={styles.footer__left}>
                    <Image src={logo_blue} alt="logo"/><br/>
                    <div className={styles.footer__left__links}>
                        <a className={styles.footer__left__link} href="#">
                            <Image src={vk} alt="Vkontakte"/>
                        </a>
                        <a className={styles.footer__left__link} href="#">
                            <Image src={tg} alt="Telegram"/>
                        </a>
                        <a className={styles.footer__left__link} href="#">
                            <Image src={yt} alt="YouTube"/>
                        </a>
                    </div>
                </div>
                <div className={styles.footer__right}>
                    <div className={styles.footer__right__left}>
                        <Link className={styles.footer__right__link} href={"/official/payment"}>Оплата</Link><br/>
                        <Link className={styles.footer__right__link} href={"/"}>Доставка</Link><br/>
                        <Link className={styles.footer__right__link} href={"/"}>Публичная Оферта</Link>
                    </div>
                    <div className={styles.footer__right__right}>
                        <Link className={styles.footer__right__link} href={"/"}>Обработка персональных данных</Link><br/>
                        <Link className={styles.footer__right__link} href={"/"}>Ответы на часто задаваемые вопросы</Link><br/>
                        <Link className={styles.footer__right__link} href={"/"}>Контакты</Link>
                    </div>
                </div>
            </div>
            <div data-testid={'footer-copyright'} className={styles.footer__copyright}>{copyright}</div>
        </div>
    );
}

export default Footer;