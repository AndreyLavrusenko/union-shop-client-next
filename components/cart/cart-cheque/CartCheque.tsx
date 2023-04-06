import React from 'react';
import {ICart} from "@/models/ICart";
import Link from "next/link";
import styles from '../../../styles/page/cart.module.scss'

interface IProps {
    availableBuy: boolean,
    price: number,
    saveTotalPriceWithDiscount: () => {}
}

const CartCheque = ({availableBuy, price, saveTotalPriceWithDiscount}: IProps) => {


    return (
        <div className={styles.cart__check}>

            <div className={styles.cart__check__wrapper}>
                <div className={styles.cart__check__left}>
                    Промежуточный итог
                </div>
                <div className={styles.cart__check__right}>
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₽"}
                </div>
            </div>

            <div className={styles.cart__check__wrapper}>
                <div className={styles.cart__check__left}>
                    Доставка
                </div>
                <div className={styles.cart__check__right}>
                    Бесплатно
                </div>
            </div>


            <div className={styles.cart__check__wrapper}>
                <div className={styles.cart__check__left}>
                    Скидка
                </div>
                <div className={styles.cart__check__right}>
                    0
                </div>
            </div>

            <div className={styles.cart__check__wrapper + ' ' + styles.cart__check__wrapper__sum}>
                <div className={styles.cart__check__sum}>Итог</div>
                <div className={styles.cart__check__pay}>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₽"}</div>
            </div>


            <div className={styles.cart__check__wrapper + ' ' + styles.cart__check__wrapper__pay}>
                <div className={styles.cart__check__lock}>
                    <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_4602_9427)">
                            <mask id="path-1-inside-1_4602_9427" fill="white">
                                <path fillRule="evenodd" clipRule="evenodd" d="M5.30325 6.62639C5.30325 2.96674 8.26999 0 11.9296 0C15.5893 0 18.556 2.96674 18.556 6.62639V7.61289C19.343 8.15367 19.859 9.06014 19.859 10.0871V18.8246C19.859 20.4814 18.5159 21.8246 16.859 21.8246H7C5.34314 21.8246 4 20.4814 4 18.8246V10.0871C4 9.06003 4.51617 8.15347 5.30325 7.61272V6.62639ZM16.556 6.62639V7.08714H7.30325V6.62639C7.30325 4.07131 9.37456 2 11.9296 2C14.4847 2 16.556 4.07131 16.556 6.62639ZM7 9.08714C6.44771 9.08714 6 9.53486 6 10.0871V18.8246C6 19.3769 6.44772 19.8246 7 19.8246H16.859C17.4113 19.8246 17.859 19.3769 17.859 18.8246V10.0871C17.859 9.53486 17.4113 9.08714 16.859 9.08714H7ZM11.9294 12.0527C11.1773 12.0527 10.5676 12.6624 10.5676 13.4145V15.4974C10.5676 16.2496 11.1773 16.8593 11.9294 16.8593C12.6816 16.8593 13.2913 16.2496 13.2913 15.4974V13.4145C13.2913 12.6624 12.6816 12.0527 11.9294 12.0527Z"/>
                            </mask>
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.30325 6.62639C5.30325 2.96674 8.26999 0 11.9296 0C15.5893 0 18.556 2.96674 18.556 6.62639V7.61289C19.343 8.15367 19.859 9.06014 19.859 10.0871V18.8246C19.859 20.4814 18.5159 21.8246 16.859 21.8246H7C5.34314 21.8246 4 20.4814 4 18.8246V10.0871C4 9.06003 4.51617 8.15347 5.30325 7.61272V6.62639ZM16.556 6.62639V7.08714H7.30325V6.62639C7.30325 4.07131 9.37456 2 11.9296 2C14.4847 2 16.556 4.07131 16.556 6.62639ZM7 9.08714C6.44771 9.08714 6 9.53486 6 10.0871V18.8246C6 19.3769 6.44772 19.8246 7 19.8246H16.859C17.4113 19.8246 17.859 19.3769 17.859 18.8246V10.0871C17.859 9.53486 17.4113 9.08714 16.859 9.08714H7ZM11.9294 12.0527C11.1773 12.0527 10.5676 12.6624 10.5676 13.4145V15.4974C10.5676 16.2496 11.1773 16.8593 11.9294 16.8593C12.6816 16.8593 13.2913 16.2496 13.2913 15.4974V13.4145C13.2913 12.6624 12.6816 12.0527 11.9294 12.0527Z" fill="black"/>
                            <path d="M18.556 7.61289H17.556V8.13906L17.9897 8.43706L18.556 7.61289ZM5.30325 7.61272L5.86952 8.43694L6.30325 8.13896V7.61272H5.30325ZM16.556 7.08714V8.08714H17.556V7.08714H16.556ZM7.30325 7.08714H6.30325V8.08714H7.30325V7.08714ZM11.9296 -1C7.71771 -1 4.30325 2.41445 4.30325 6.62639H6.30325C6.30325 3.51902 8.82227 1 11.9296 1V-1ZM19.556 6.62639C19.556 2.41445 16.1416 -1 11.9296 -1V1C15.037 1 17.556 3.51902 17.556 6.62639H19.556ZM19.556 7.61289V6.62639H17.556V7.61289H19.556ZM20.859 10.0871C20.859 8.71692 20.1692 7.50806 19.1224 6.78873L17.9897 8.43706C18.5168 8.79927 18.859 9.40336 18.859 10.0871H20.859ZM20.859 18.8246V10.0871H18.859V18.8246H20.859ZM16.859 22.8246C19.0682 22.8246 20.859 21.0337 20.859 18.8246H18.859C18.859 19.9292 17.9636 20.8246 16.859 20.8246V22.8246ZM7 22.8246H16.859V20.8246H7V22.8246ZM3 18.8246C3 21.0337 4.79086 22.8246 7 22.8246V20.8246C5.89543 20.8246 5 19.9292 5 18.8246H3ZM3 10.0871V18.8246H5V10.0871H3ZM4.73699 6.7885C3.69001 7.5078 3 8.71677 3 10.0871H5C5 9.40329 5.34232 8.79915 5.86952 8.43694L4.73699 6.7885ZM4.30325 6.62639V7.61272H6.30325V6.62639H4.30325ZM17.556 7.08714V6.62639H15.556V7.08714H17.556ZM7.30325 8.08714H16.556V6.08714H7.30325V8.08714ZM6.30325 6.62639V7.08714H8.30325V6.62639H6.30325ZM11.9296 1C8.82228 1 6.30325 3.51902 6.30325 6.62639H8.30325C8.30325 4.62359 9.92684 3 11.9296 3V1ZM17.556 6.62639C17.556 3.51902 15.037 1 11.9296 1V3C13.9324 3 15.556 4.62359 15.556 6.62639H17.556ZM7 10.0871V10.0871V8.08714C5.89543 8.08714 5 8.98257 5 10.0871H7ZM7 18.8246V10.0871H5V18.8246H7ZM7 18.8246H7H5C5 19.9292 5.89543 20.8246 7 20.8246V18.8246ZM16.859 18.8246H7V20.8246H16.859V18.8246ZM16.859 18.8246V18.8246V20.8246C17.9636 20.8246 18.859 19.9292 18.859 18.8246H16.859ZM16.859 10.0871V18.8246H18.859V10.0871H16.859ZM16.859 10.0871H16.859H18.859C18.859 8.98257 17.9636 8.08714 16.859 8.08714V10.0871ZM7 10.0871H16.859V8.08714H7V10.0871ZM11.5676 13.4145C11.5676 13.2147 11.7296 13.0527 11.9294 13.0527V11.0527C10.625 11.0527 9.56757 12.1101 9.56757 13.4145H11.5676ZM11.5676 15.4974V13.4145H9.56757V15.4974H11.5676ZM11.9294 15.8593C11.7296 15.8593 11.5676 15.6973 11.5676 15.4974H9.56757C9.56757 16.8018 10.625 17.8593 11.9294 17.8593V15.8593ZM12.2913 15.4974C12.2913 15.6973 12.1293 15.8593 11.9294 15.8593V17.8593C13.2339 17.8593 14.2913 16.8018 14.2913 15.4974H12.2913ZM12.2913 13.4145V15.4974H14.2913V13.4145H12.2913ZM11.9294 13.0527C12.1293 13.0527 12.2913 13.2147 12.2913 13.4145H14.2913C14.2913 12.1101 13.2339 11.0527 11.9294 11.0527V13.0527Z" fill="black" mask="url(#path-1-inside-1_4602_9427)"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_4602_9427" x="0" y="0" width="23.8594" height="29.8242" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4602_9427"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4602_9427" result="shape"/>
                            </filter>
                        </defs>
                    </svg>
                    <p>Все данные защищены сертификатом TLS
                        и передаются в зашифрованном виде.</p>
                </div>

                {availableBuy
                    ? <Link style={{ textDecoration: "none"}} onClick={saveTotalPriceWithDiscount} href="delivery/delivery-method" className={styles.cart__check__button}>Оформить заказ</Link>
                    : <button style={{ textDecoration: "none", backgroundColor: "#0707e1", cursor: "not-allowed"}} className={styles.cart__check__button}>Доступны не все товары</button>
                }
            </div>
        </div>
    )
};

export default CartCheque;