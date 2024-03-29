import React, {useState} from 'react';
import nav_logo from '../../assets/image/logo/nav_logo.svg'
import NavItems from "@/components/navbar/navItems/NavItems";
import Image from "next/image";
import Modal from "@/components/modal/Modal";
import { signOut } from "next-auth/react"
import styles from './navbar.module.scss'
import Link from "next/link";


interface IProps {
    quantityState: number
    navbar: boolean,
    closeNavbar: (status: boolean) => void,
    isAuth: any,
}

const Navbar = ({quantityState, navbar, closeNavbar, isAuth}: IProps) => {
    const [modal, setModal] = useState(false)

    return (
        <div className={styles.side + " js-side" } style={navbar ? {zIndex: "2", position: "fixed", visibility: 'visible'} : {zIndex: "0", position: "absolute", visibility: 'hidden'}}>
            <div className={styles.side__inner} style={navbar ? {opacity: "1", visibility: 'visible'} : {opacity: "0", visibility: "hidden"}}>
                <Link href="/">
                    <Image src={nav_logo} className={styles.nav__logo} alt="logo" />
                </Link>

                <nav className={styles.nav}>
                    <ul>
                        <NavItems pathway={"/"} name={"Главная"} closeNavbar={closeNavbar}>
                            <svg className={styles.nav__list__icon} width="25" height="25" viewBox="0 0 25 25"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M12.5019 19.5351V16.0194M10.2828 1.74563L2.31448 8.24967C1.41761 8.97625 0.842698 10.5114 1.03817 11.6599L2.56744 20.9882C2.8434 22.6523 4.40716 24 6.06291 24H18.941C20.5852 24 22.1605 22.6406 22.4364 20.9882L23.9657 11.6599C24.1497 10.5114 23.5748 8.97625 22.6894 8.24967L14.7211 1.75735C13.4908 0.749513 11.5016 0.749513 10.2828 1.74563V1.74563Z"
                                    stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </NavItems>
                        <NavItems pathway={"/shop"} name={"Все товары"} closeNavbar={closeNavbar}>
                            <svg className={styles.nav__list__icon} width="26" height="22" viewBox="0 0 26 22"
                                 fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.69233 2.12586C1.36775 3.45849 -0.00996548 4.2751 5.42794e-05 4.32018C0.0150839 4.39533 2.06913 10.0866 2.09418 10.1166C2.1042 10.1266 4.85463 9.22987 5.26043 9.07957C5.30551 9.06454 5.32054 10.307 5.32054 15.2016V21.3438H12.7853H20.25V15.2016C20.25 10.307 20.265 9.06454 20.3151 9.07957C20.7159 9.22987 23.4663 10.1266 23.4763 10.1166C23.4864 10.1066 23.9673 8.789 24.5485 7.19084C25.4402 4.73099 25.5955 4.2751 25.5304 4.23001C25.4903 4.19995 23.817 3.23304 21.8081 2.08578L18.1558 0.00166989H16.7982H15.4405V0.187035C15.4405 0.442539 15.3253 0.858359 15.1599 1.19903C14.9746 1.57978 14.4035 2.1459 14.0027 2.3513C12.9255 2.89237 11.7632 2.69698 10.9015 1.83529C10.4256 1.35935 10.13 0.728102 10.13 0.187035V0.00166989H8.76734L7.39964 0.00667976L3.69233 2.12586ZM9.3034 1.31426C9.53385 1.96554 10.135 2.71201 10.7312 3.09777C12.0187 3.91939 13.5518 3.91939 14.8393 3.09777C15.4355 2.71201 16.0367 1.96554 16.2671 1.31426L16.3623 1.05374H17.1038H17.8452L21.0516 2.88736C22.815 3.89435 24.2579 4.74602 24.2579 4.77608C24.2629 4.90634 22.8301 8.76896 22.78 8.76896C22.7499 8.76896 21.9533 8.50844 21.0015 8.19282C20.0496 7.8772 19.258 7.61668 19.238 7.61668C19.2129 7.61668 19.1979 10.4673 19.1979 13.9542V20.2917H12.7853H6.37262V13.9542C6.37262 10.4673 6.35759 7.61668 6.33254 7.61668C6.3125 7.61668 5.52094 7.8772 4.56906 8.19282C3.61719 8.50844 2.82062 8.76896 2.79056 8.76896C2.73044 8.76896 1.2926 4.84622 1.32266 4.76105C1.33268 4.73099 2.77052 3.88433 4.51896 2.88235L7.70024 1.05875H8.45673L9.20821 1.05374L9.3034 1.31426Z"
                                    fill="black"/>
                            </svg>
                        </NavItems>
                        {isAuth ?
                            <NavItems data-testid={"cart"} quantityState={quantityState} pathway={"/cart"} name={"Корзина"} closeNavbar={closeNavbar}>
                                <svg className={styles.nav__list__icon} width="25" height="25" viewBox="0 0 25 25"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1 1H3.04728C4.318 1 5.31811 2.0695 5.21222 3.3L4.23564 14.754C4.19751 15.1977 4.2541 15.6444 4.40182 16.0656C4.54954 16.4869 4.78517 16.8735 5.09378 17.2011C5.40239 17.5287 5.77725 17.7901 6.19462 17.9686C6.61198 18.1472 7.06274 18.2391 7.51834 18.2385H20.0491C21.7434 18.2385 23.2259 16.8815 23.3553 15.237L23.9907 6.612C24.1319 4.703 22.6494 3.1505 20.6845 3.1505H5.4946M9.23618 7.9H23.3553M17.7665 24C18.1566 24 18.5307 23.8486 18.8065 23.579C19.0823 23.3094 19.2372 22.9437 19.2372 22.5625C19.2372 22.1813 19.0823 21.8156 18.8065 21.546C18.5307 21.2764 18.1566 21.125 17.7665 21.125C17.3764 21.125 17.0023 21.2764 16.7265 21.546C16.4507 21.8156 16.2958 22.1813 16.2958 22.5625C16.2958 22.9437 16.4507 23.3094 16.7265 23.579C17.0023 23.8486 17.3764 24 17.7665 24ZM8.35373 24C8.74379 24 9.11788 23.8486 9.3937 23.579C9.66952 23.3094 9.82447 22.9437 9.82447 22.5625C9.82447 22.1813 9.66952 21.8156 9.3937 21.546C9.11788 21.2764 8.74379 21.125 8.35373 21.125C7.96366 21.125 7.58957 21.2764 7.31375 21.546C7.03794 21.8156 6.88298 22.1813 6.88298 22.5625C6.88298 22.9437 7.03794 23.3094 7.31375 23.579C7.58957 23.8486 7.96366 24 8.35373 24Z"
                                        stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                            </NavItems>
                            : null
                        }
                        {isAuth ?
                            <NavItems data-testid={"orders"} pathway={"/order"} name={"Мои заказы"} closeNavbar={closeNavbar}>
                                <svg className={styles.nav__list__icon} width="25" height="25" viewBox="0 0 23 23"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_4757_11064)">
                                        <path
                                            d="M11.1717 0.0673828C9.74315 0.341406 8.57967 1.21738 7.9283 2.50664L7.77557 2.8166L4.05604 3.97559C2.01209 4.61348 0.2826 5.16602 0.215217 5.20195C0.0175604 5.31426 -0.0543146 5.56133 0.0490057 5.76348C0.0759589 5.81738 0.713849 6.48223 1.46854 7.23691L2.83865 8.61152L1.95819 10.085C1.29783 11.19 1.07772 11.5943 1.07772 11.7021C1.07772 11.9986 1.15408 12.0436 2.56014 12.5107L3.86287 12.9465V16.4504C3.86287 19.6668 3.86737 19.9633 3.93924 20.0846C3.97967 20.152 4.04705 20.2238 4.08299 20.2418C4.57264 20.4439 11.4412 23 11.4951 23C11.5355 23 13.4222 22.3801 15.6863 21.6254C19.4103 20.3855 19.8191 20.2418 19.9224 20.116L20.0347 19.9813V16.374V12.7623L20.7445 12.5377C21.1308 12.4164 21.7418 12.2232 22.1056 12.1109C22.465 11.9986 22.8019 11.8639 22.8558 11.8145C22.9726 11.7021 23.0176 11.5404 22.9771 11.3742C22.9592 11.2979 22.4785 10.7812 21.5935 9.8918L20.2369 8.53516L21.5711 7.19648C22.3033 6.46426 22.9232 5.81738 22.9502 5.76348C23.0715 5.5209 22.9547 5.25137 22.6762 5.14805C22.5683 5.10762 21.1982 4.68086 19.6305 4.2002C15.839 3.03223 16.2299 3.17148 16.167 2.97383C16.0906 2.72227 15.8346 2.22812 15.6369 1.93613C15.0349 1.05117 14.0781 0.395313 13.0045 0.130274C12.5193 0.00898552 11.6344 -0.0179691 11.1717 0.0673828ZM12.8472 1.01074C14.0826 1.32969 15.1158 2.36738 15.4347 3.61621C15.5471 4.05645 15.5471 4.94141 15.4347 5.36816C14.9496 7.20098 13.1617 8.35098 11.3199 8.02305C10.0666 7.79844 8.95701 6.84609 8.55721 5.64219C7.84744 3.52188 9.16366 1.35215 11.4008 0.943359C11.7062 0.884962 12.5058 0.92539 12.8472 1.01074ZM7.4701 4.21816C7.42069 4.84707 7.60487 5.82637 7.86541 6.34297C7.91483 6.43731 7.95076 6.51816 7.95076 6.53164C7.95076 6.54062 6.95799 6.88203 5.74959 7.28633L3.54842 8.01855L2.42537 6.89551L1.30233 5.77246L4.34803 4.82012C6.01912 4.29902 7.4117 3.86777 7.44315 3.86777C7.48358 3.86328 7.49256 3.95312 7.4701 4.21816ZM19.1678 4.99531L21.6969 5.77246L20.5738 6.89551L19.4508 8.01855L17.6449 7.4166C16.6476 7.08867 15.8301 6.81016 15.8211 6.80566C15.8121 6.79668 15.8705 6.66191 15.9514 6.50918C16.2433 5.92969 16.3826 5.38164 16.4275 4.64043C16.4545 4.19121 16.459 4.17324 16.5488 4.1957C16.6027 4.20918 17.7797 4.56856 19.1678 4.99531ZM8.78182 7.65469C10.1295 9.00684 12.151 9.35723 13.858 8.53965C14.2892 8.33301 14.9137 7.90625 15.1293 7.67266L15.2326 7.55586L16.6701 8.03203C17.4562 8.29707 18.1031 8.52168 18.1031 8.53516C18.1031 8.54863 16.6162 9.05176 14.8014 9.6582L11.4996 10.7588L8.19783 9.6582C6.38299 9.05176 4.89608 8.54863 4.89608 8.53516C4.89608 8.51719 8.00018 7.45703 8.43592 7.32676C8.44041 7.32227 8.59764 7.47051 8.78182 7.65469ZM7.28592 10.2961L10.8258 11.4775L10.125 12.6455C9.73866 13.2879 9.41971 13.8225 9.41073 13.8314C9.40174 13.8359 7.77557 13.3059 5.79901 12.6455L2.20076 11.4461L2.25916 11.3473C2.28612 11.2889 2.60506 10.7543 2.96444 10.1568C3.43612 9.3707 3.63377 9.07871 3.68319 9.09668C3.71912 9.11016 5.3408 9.64922 7.28592 10.2961ZM20.5828 10.1838L21.6969 11.2979L17.9099 12.4838C15.8301 13.1352 14.1096 13.6787 14.0826 13.6832C14.0377 13.6967 12.2812 11.518 12.2947 11.4641C12.3037 11.4326 19.3025 9.0832 19.4058 9.07871C19.4418 9.07422 19.9719 9.57285 20.5828 10.1838ZM12.8248 13.5979C13.7097 14.7164 13.7277 14.7254 14.1275 14.6131C14.2533 14.5771 15.4078 14.2133 16.6971 13.809C17.9863 13.4047 19.0644 13.0723 19.0914 13.0723C19.1228 13.0723 19.1363 14.1234 19.1363 16.3021V19.532L15.601 20.7135C13.6514 21.3604 12.0342 21.8994 12.0072 21.9129C11.9623 21.9264 11.9488 20.9695 11.9488 17.223C11.9488 14.5906 11.9668 12.5332 11.9892 12.5557C12.0072 12.5826 12.3846 13.0498 12.8248 13.5979ZM11.0324 21.8635C11.0234 21.877 9.61287 21.3604 7.89686 20.718L4.78377 19.5545L4.7703 16.401C4.7658 14.6715 4.7658 13.252 4.77479 13.252C4.77928 13.252 5.84393 13.6068 7.14217 14.0381C8.44041 14.4693 9.54549 14.8242 9.5994 14.8242C9.84198 14.8242 9.92733 14.7254 10.4799 13.8045L11.0279 12.8926L11.0414 17.3713C11.0459 19.833 11.0414 21.8545 11.0324 21.8635Z"
                                            fill="black"/>
                                        <path
                                            d="M13.97 2.76625C13.9071 2.80668 13.3276 3.36821 12.6807 4.01059L11.5038 5.18305L11.1983 4.89106C11.0321 4.72934 10.8434 4.57211 10.785 4.54067C10.6323 4.45532 10.3987 4.51821 10.2684 4.67543C10.0349 4.94946 10.1292 5.14711 10.839 5.82543C11.2747 6.2477 11.405 6.31957 11.6206 6.26567C11.7509 6.23422 14.2665 3.777 14.5136 3.44008C14.6888 3.202 14.6843 3.04028 14.4911 2.84711C14.3204 2.67641 14.1497 2.64946 13.97 2.76625Z"
                                            fill="black"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4757_11064">
                                            <rect width="23" height="23" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </NavItems>
                            : null
                        }
                        {isAuth ?
                            <NavItems data-testid={"profile"} pathway={"/profile"} name={"Профиль"} closeNavbar={closeNavbar}>
                                <svg  className={styles.nav__list__icon} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </NavItems>
                            : null
                        }

                    </ul>
                </nav>

                <div className={styles.side__footer}>
                    {isAuth

                        ? <button className={styles.logout__link} onClick={() => signOut()} title="Logout">

                            <svg className={styles.logout__link__icon} xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                 viewBox="0 0 24 24">
                                <path fill="#19262E"
                                      d="M7 22H5a3 3 0 01-3-3V5a3 3 0 013-3h2a1 1 0 000-2H5a5.006 5.006 0 00-5 5v14a5.006 5.006 0 005 5h2a1 1 0 000-2z"/>
                                <path fill="#19262E"
                                      d="M18.538 18.707l4.587-4.586a3.007 3.007 0 000-4.242l-4.587-4.586a1 1 0 00-1.414 1.414L21.416 11H6a1 1 0 000 2h15.417l-4.293 4.293a1 1 0 101.414 1.414z"/>
                            </svg>
                            <span className={styles.logout__link__text}>Выйти</span>
                        </button>

                        : <button className={styles.logout__link} title="Login" onClick={() => setModal(true)}>
                            <svg width="25" height="25" viewBox="0 0 80 80" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="Face-ID" fill="#000000">
                                        <g>
                                            <g>
                                                <g id="Corners" fillRule="nonzero">
                                                    <g id="Corner">
                                                        <path
                                                            d="M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z"/>
                                                    </g>
                                                    <g id="Corner"
                                                       transform="translate(68.070175, 11.929825) scale(-1, 1) translate(-68.070175, -11.929825) translate(56.140351, 0.000000)">
                                                        <path
                                                            d="M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z"/>
                                                    </g>
                                                    <g id="Corner"
                                                       transform="translate(11.929825, 68.070175) scale(1, -1) translate(-11.929825, -68.070175) translate(0.000000, 56.140351)">
                                                        <path
                                                            d="M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z"/>
                                                    </g>
                                                    <g id="Corner"
                                                       transform="translate(68.070175, 68.070175) scale(-1, -1) translate(-68.070175, -68.070175) translate(56.140351, 56.140351)">
                                                        <path
                                                            d="M4.11428571,21.9428571 L4.11428571,13.0285714 C4.11428571,7.99327149 7.99327149,4.11428571 13.0285714,4.11428571 L21.9428571,4.11428571 C23.0789858,4.11428571 24,3.19327149 24,2.05714286 C24,0.921014229 23.0789858,0 21.9428571,0 L13.0285714,0 C5.72101423,0 0,5.72101423 0,13.0285714 L0,21.9428571 C0,23.0789858 0.921014229,24 2.05714286,24 C3.19327149,24 4.11428571,23.0789858 4.11428571,21.9428571 Z"/>
                                                    </g>
                                                </g>
                                                <g id="Eye" transform="translate(21.754386, 28.070175)"
                                                   fillRule="nonzero">
                                                    <path
                                                        d="M0,2.14285714 L0,7.86037654 C0,9.04384386 0.8954305,10.0032337 2,10.0032337 C3.1045695,10.0032337 4,9.04384386 4,7.86037654 L4,2.14285714 C4,0.959389822 3.1045695,0 2,0 C0.8954305,0 0,0.959389822 0,2.14285714 Z"
                                                        id="Path"/>
                                                </g>
                                                <g id="Eye" transform="translate(54.736842, 28.070175)"
                                                   fillRule="nonzero">
                                                    <path
                                                        d="M0,2.14285714 L0,7.86037654 C0,9.04384386 0.8954305,10.0032337 2,10.0032337 C3.1045695,10.0032337 4,9.04384386 4,7.86037654 L4,2.14285714 C4,0.959389822 3.1045695,0 2,0 C0.8954305,0 0,0.959389822 0,2.14285714 Z"
                                                        id="Path"/>
                                                </g>
                                                <path
                                                    d="M25.9319616,59.0829234 C29.8331111,62.7239962 34.5578726,64.5614035 40,64.5614035 C45.4421274,64.5614035 50.1668889,62.7239962 54.0680384,59.0829234 C54.9180398,58.2895887 54.9639773,56.9574016 54.1706427,56.1074002 C53.377308,55.2573988 52.0451209,55.2114613 51.1951195,56.0047959 C48.0787251,58.9134307 44.382434,60.3508772 40,60.3508772 C35.617566,60.3508772 31.9212749,58.9134307 28.8048805,56.0047959 C27.9548791,55.2114613 26.622692,55.2573988 25.8293573,56.1074002 C25.0360227,56.9574016 25.0819602,58.2895887 25.9319616,59.0829234 Z"
                                                    id="Mouth" fillRule="nonzero"/>
                                                <path
                                                    d="M40,30.1754386 L40,44.9122807 C40,45.85537 39.539042,46.3157895 38.5912711,46.3157895 L37.1929825,46.3157895 C36.0302777,46.3157895 35.0877193,47.2583479 35.0877193,48.4210526 C35.0877193,49.5837574 36.0302777,50.5263158 37.1929825,50.5263158 L38.5912711,50.5263158 C41.8633505,50.5263158 44.2105263,48.1818819 44.2105263,44.9122807 L44.2105263,30.1754386 C44.2105263,29.0127339 43.2679679,28.0701754 42.1052632,28.0701754 C40.9425584,28.0701754 40,29.0127339 40,30.1754386 Z"
                                                    id="Nose" fillRule="nonzero"/>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span className={styles.logout__link__text}>Войти</span>
                        </button>
                    }

                </div>
            </div>
            <div className={styles.navContainer}>
                <input className={styles.checkbox} type="checkbox"/>
                <div className={styles.hamburger__lines} onClick={() => closeNavbar(!navbar)}>
                    <span className={styles.line}/>
                    <span className={styles.line}/>
                    <span className={styles.line}/>
                </div>
            </div>
            <Modal active={modal} setModalActive={setModal}/>
        </div>
    );
};

export default Navbar;