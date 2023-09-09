import React, {useEffect, useState} from 'react';
import logo_blue from '../../assets/image/logo/logo_blue.svg'
import vk from '../../assets/image/icon/vk.svg'
import tg from '../../assets/image/icon/telegram.svg'
import yt from '../../assets/image/icon/youtube.svg'
import styles from './footer.module.scss'
import Link from "next/link";
import Image from "next/image";
import {useTranslation} from "next-i18next";


interface IProps {
    copyright: string
}

const Footer = ({copyright}: IProps) => {
    const {t: translate} = useTranslation('common')

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
                        <Link className={styles.footer__right__link} href={"/official/payment"}>{translate("footer_pay")}</Link><br/>
                        <Link className={styles.footer__right__link} href={"/official/delivery"}>{translate("footer_delivery")}</Link><br/>
                        <Link className={styles.footer__right__link} href={"/official/public-offer"}>{translate("footer_public_offer")}</Link>
                    </div>
                    <div className={styles.footer__right__right}>
                        <Link className={styles.footer__right__link} href={"/official/personal-data"}>{translate("footer_process")}</Link><br/>
                        <Link className={styles.footer__right__link} href={"/official/faq"}>{translate("footer_faq")}</Link><br/>
                        <Link className={styles.footer__right__link} href={"/official/contacts"}>{translate("footer_contact")}</Link>
                    </div>
                </div>
            </div>
            <div data-testid={'footer-copyright'} className={styles.footer__copyright}>{copyright}</div>
        </div>
    );
}

export default Footer;