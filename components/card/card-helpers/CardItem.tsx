import React, {forwardRef, useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/router";

import styles from '../card.module.scss'
import Image from "next/image";

interface IProps {
    backgroundcolor: string;
    color: string;
    subColor: string;
    image: string;
    subtitle: string;
    title: string;
    isLogo: number;
    id: number;
}

const CardItem = forwardRef(({backgroundcolor, color, subColor, image, subtitle, title, isLogo, id}: IProps, ref: any) => {

    const router = useRouter()
    const [isShop, setShop] = useState(false)

    // Если это магазин /shop то убираем анимацию
    useEffect(() => {
        if (router.pathname === '/') {
            setShop(true)
        }
    }, [])

    return (
        <Link ref={ref} href={`/product/${id}`} key={id} className={isShop ? styles.stripe__card + " " + styles.stripe__card__hover : styles.stripe__card} style={{backgroundColor: backgroundcolor, color: color}}>
            <div className={styles.stripe__card__header}>
                <div className={styles.stripe__header__title}>{title}</div>
                <div className={styles.stripe__header__subtitle}
                     style={subColor ? {color: subColor} : {color: color}}>{subtitle}</div>
                {isLogo
                    ? <svg width="66" height="73" viewBox="0 0 66 73" stroke={color} fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <g mask="url(#mask0_4885_10821)">
                            <path
                                d="M3.73242 4.29688V42.472C3.90307 57.9573 16.8029 70.4597 32.7379 70.4597C48.6731 70.4597 61.5729 57.9573 61.7435 42.472V4.29688H3.73242ZM59.8228 42.1542C59.6631 56.7186 47.6165 68.477 32.767 68.477C17.9175 68.477 5.87089 56.7186 5.71478 42.1542V6.2542H59.8228V42.1542Z"
                                fill="#F5F6F4"/>
                            <path d="M33.7697 62.543H31.7656V68.7761H33.7697V62.543Z" fill="#F5F6F4"/>
                            <path d="M19.4755 51.4336H7.36719V53.3873H19.4755V51.4336Z" fill="#F5F6F4"/>
                            <path d="M15.2323 53.0352H13.25V55.9855H15.2323V53.0352Z" fill="#F5F6F4"/>
                            <path d="M58.0516 51.4297H45.8125V53.3942H58.0516V51.4297Z" fill="#F5F6F4"/>
                            <path d="M51.9307 53.2578H49.9375V55.9879H51.9307V53.2578Z" fill="#F5F6F4"/>
                            <path d="M13.9238 61.233L22.0058 57.0078L23.1168 58.6437L15.5286 62.6089L13.9238 61.233Z"
                                  fill="#F5F6F4"/>
                            <path d="M26.2088 61.1406L24.9199 63.3472L26.6081 64.3295L28.0241 61.9605L26.2088 61.1406Z"
                                  fill="#F5F6F4"/>
                            <path d="M37.5156 61.8949L38.9424 64.3325L40.6489 63.3394L39.2982 61.0391L37.5156 61.8949Z"
                                  fill="#F5F6F4"/>
                            <path d="M42.5879 58.7367L50.0344 62.6406L51.5012 61.1997L43.855 57.1875L42.5879 58.7367Z"
                                  fill="#F5F6F4"/>
                            <path
                                d="M38.7703 40.7227L37.7391 42.4127C39.0442 43.4219 40.0023 44.8089 40.4813 46.3825C40.9604 47.9562 40.9367 49.6388 40.4138 51.1986C39.8908 52.7583 38.8942 54.1182 37.5615 55.0908C36.2287 56.0635 34.6254 56.6007 32.9726 56.6287C31.3198 56.6568 29.699 56.1741 28.3337 55.2472C26.9684 54.3203 25.9259 52.995 25.3498 51.4539C24.7737 49.9127 24.6925 48.2318 25.1174 46.6428C25.5423 45.0539 26.4524 43.6352 27.7221 42.5824L26.6329 40.8851C24.9991 42.1671 23.81 43.9258 23.2327 45.9144C22.6554 47.903 22.7189 50.0215 23.4141 51.9723C24.1095 53.9232 25.4017 55.6084 27.1093 56.7913C28.817 57.9742 30.8542 58.5953 32.935 58.5675C35.0158 58.5395 37.0354 57.864 38.7103 56.6358C40.3853 55.4075 41.6314 53.6884 42.2736 51.7195C42.9158 49.7507 42.9219 47.6313 42.2909 45.659C41.66 43.6865 40.4237 41.9603 38.7557 40.7227H38.7703Z"
                                fill="#F5F6F4"/>
                            <path
                                d="M41.9125 37.8468L40.2823 39.0673C42.2947 40.6253 43.7675 42.7695 44.4952 45.2005C45.2228 47.6316 45.1689 50.2279 44.3409 52.627C43.5128 55.026 41.9521 57.1078 39.8768 58.5817C37.8014 60.0556 35.315 60.8479 32.7649 60.8479C30.2149 60.8479 27.7285 60.0556 25.6531 58.5817C23.5777 57.1078 22.017 55.026 21.1891 52.627C20.3611 50.2279 20.3071 47.6316 21.0348 45.2005C21.7623 42.7695 23.2353 40.6253 25.2476 39.0673L23.7953 37.6914C21.5225 39.5269 19.8746 42.0156 19.077 44.8175C18.2793 47.6193 18.3706 50.5978 19.3386 53.346C20.3066 56.0944 22.1039 58.4785 24.485 60.1726C26.8662 61.8668 29.7152 62.7886 32.6428 62.8119C35.5703 62.8353 38.4338 61.9592 40.842 60.3032C43.2502 58.6472 45.0857 56.2921 46.0979 53.5597C47.11 50.8272 47.2495 47.8505 46.4971 45.0363C45.7447 42.2221 44.1373 39.7074 41.8944 37.8359L41.9125 37.8468Z"
                                fill="#F5F6F4"/>
                            <path
                                d="M31.8419 56.602L31.8128 38.2024L30.3243 39.7625L28.8974 38.3975L31.8237 35.3675L31.7911 15.0576L27.3652 9.30111L28.9264 8.10938L32.7786 13.1219L36.638 8.11661L38.1992 9.29389L33.7516 15.0611L33.7807 35.3206L36.7469 38.4011L35.3383 39.7516L33.7843 38.1483L33.8061 56.7285L31.8419 56.602Z"
                                fill="#F5F6F4"/>
                            <path
                                d="M27.6052 54.7212V46.3574C27.6227 45.884 27.6106 45.4101 27.5689 44.9381C27.4999 44.2159 27.0461 42.9338 25.7536 41.0235C24.938 39.7669 23.7376 38.8046 22.3298 38.2789C21.5511 37.9914 20.7512 37.7645 19.9372 37.6L16.7168 41.1535L15.2645 39.8426L17.403 37.4916C17.403 37.4916 16.5353 37.5421 16.1613 37.5747C15.7873 37.6072 14.7998 37.6974 14.346 37.748L12.9336 37.9069C12.5306 37.9538 11.4196 38.1055 11.4196 38.1055L11.1582 36.1555C11.1582 36.1555 12.4616 36.0001 13.8195 35.8557C15.1774 35.7112 16.085 35.5957 17.3993 35.5523C18.7216 35.4805 20.0474 35.5923 21.3386 35.8846C22.7153 36.2099 24.0095 36.8149 25.14 37.6613C26.6322 38.7447 27.2566 39.7703 27.99 40.9115C28.6337 41.8122 29.1073 42.8217 29.3879 43.8909C29.5378 44.9675 29.6009 46.0544 29.5767 47.1411V56.5594L27.6814 55.7684L27.6052 54.7212Z"
                                fill="#F5F6F4"/>
                            <path
                                d="M37.9676 55.001V46.2471C37.9061 45.3233 38.0295 44.3966 38.3307 43.5206C38.7573 42.3284 39.4175 41.2323 40.2731 40.2957C41.1859 39.4226 42.2531 38.7247 43.4209 38.2373C44.05 37.9767 44.7063 37.7865 45.3778 37.6702L49.4986 41.2419L50.8129 39.7974L48.1697 37.4897C49.0046 37.4744 49.8396 37.5202 50.6677 37.6269C52.65 37.8147 54.6614 38.1722 54.6614 38.1722L55.0426 36.2439C55.0426 36.2439 52.9514 35.8826 50.9799 35.6949C49.5486 35.529 48.106 35.4807 46.6667 35.5505C45.1918 35.6363 43.7432 35.9772 42.3861 36.558C40.9604 37.1944 39.673 38.1009 38.5957 39.2267C37.6923 40.2639 36.9883 41.4575 36.5189 42.7478C36.2098 43.6631 36.0337 44.6178 35.9961 45.5827V56.1854L37.6045 55.6365L37.9676 55.001Z"
                                fill="#F5F6F4"/>
                            <path
                                d="M9.23438 31.7893L9.4558 33.7321C9.4558 33.7321 12.6871 33.4252 14.8002 33.2771C16.9132 33.1291 19.0444 33.0243 20.2462 33.1759C21.675 33.3233 23.0785 33.6547 24.4215 34.1618C24.9619 34.3727 25.4871 34.6201 25.9936 34.9022C26.2295 35.0322 26.7742 35.4511 27.2788 35.4259C27.7835 35.4005 28.2337 35.2922 28.4225 34.9022C28.6177 34.3525 28.6738 33.7633 28.5859 33.1868C28.49 32.3907 28.3261 31.6042 28.0958 30.8359C27.929 30.3225 27.7226 29.8227 27.4785 29.3408C27.2389 28.8822 26.5345 27.8602 26.3567 27.5784C26.0731 27.1607 25.7614 26.7625 25.4236 26.3867L23.9713 27.6832C24.0675 27.7834 24.1572 27.8895 24.2399 28.001C24.3633 28.1743 24.4578 28.2899 24.7192 28.6474C24.9806 29.0049 25.3255 29.5358 25.5252 29.8788C25.7584 30.2592 25.9576 30.6592 26.1206 31.0742C26.2541 31.4365 26.349 31.8117 26.4038 32.1938C26.4431 32.4142 26.4566 32.6384 26.4437 32.8618C26.4111 32.9124 26.1351 32.7571 25.7648 32.591C25.3945 32.4248 24.5813 32.1214 24.1891 31.9987C23.797 31.8759 23.1326 31.6953 22.7368 31.6087C22.3411 31.522 21.6477 31.392 21.1829 31.3306C20.7182 31.2692 19.7706 31.1754 19.3676 31.1609C18.9645 31.1464 18.1949 31.1393 17.7265 31.1609C17.2582 31.1825 16.6736 31.2042 16.2452 31.2259C15.8167 31.2476 15.0688 31.2908 14.6223 31.3233C14.1757 31.3559 13.435 31.41 12.9195 31.4534L10.8863 31.6376L9.23438 31.7893Z"
                                fill="#F5F6F4"/>
                            <path
                                d="M40.3845 26.3438C39.9521 26.7139 39.5569 27.1252 39.2046 27.5716C38.5972 28.4024 38.0983 29.3064 37.7196 30.2621C37.4055 31.0454 37.1625 31.8551 36.9935 32.6816C36.8034 33.3788 36.8892 34.1219 37.2331 34.7581C37.3551 34.9285 37.5199 35.0641 37.711 35.1515C37.9021 35.2389 38.1128 35.2751 38.3223 35.2564C39.0171 35.2306 39.6938 35.0305 40.2901 34.675C41.2428 34.1052 42.281 33.6907 43.3653 33.4472C44.5013 33.1527 45.6696 32.9987 46.8435 32.9886C48.2099 32.9615 49.5767 33.0024 50.939 33.1113C52.0972 33.198 53.6983 33.3461 54.5697 33.4724C55.4411 33.5989 56.1889 33.7072 56.1889 33.7072L56.4939 31.7571C56.4939 31.7571 54.6786 31.4935 53.1501 31.3527C51.6216 31.2118 49.8134 31.0349 48.3575 31.042C46.7761 31.007 45.1951 31.1279 43.6376 31.4032C41.7751 31.7643 39.6693 32.7574 39.535 32.7827C39.4006 32.808 39.3716 32.8224 39.2772 32.7574C39.1828 32.6924 39.1755 32.2916 39.2372 32.0822C39.4261 31.3365 39.7129 30.6189 40.0904 29.9478C40.4135 29.36 40.7967 28.8069 41.2341 28.2975C41.3939 28.1249 41.5675 27.9654 41.7533 27.8208L40.3845 26.3438Z"
                                fill="#F5F6F4"/>
                            <path
                                d="M31.8163 32.5879C31.8163 32.5879 31.5113 28.7635 30.8396 27.3226C30.0228 25.5747 26.7661 22.5016 26.7661 22.5016L19.1416 22.8121L15.9683 28.5902L14.2293 27.6549L16.847 22.8879L13.1583 23.0179L13.082 21.0642L24.9471 20.6272L18.3247 14.3039L19.6753 12.8594L25.4844 18.4027L26.2106 14.9395L28.113 15.3295L27.14 20.0603C27.14 20.0603 29.2458 22.2018 30.1789 23.2346C31.268 24.4589 32.0814 25.5278 32.0814 25.5278L31.8163 32.5879Z"
                                fill="#F5F6F4"/>
                            <path
                                d="M33.7752 32.5071C33.9015 30.9116 34.2624 29.3432 34.8462 27.8521C35.9899 25.1724 39.076 22.399 39.076 22.399L46.9909 22.789L50.135 28.5671L51.8741 27.6318L49.271 22.8649L52.6838 23.0165L52.7819 21.0484L40.9386 20.5247L44.9904 16.7112L47.6553 14.2844L46.3302 12.8398L43.3966 15.5736L40.3068 18.4265L39.617 14.9669L37.7 15.346L38.6367 20.0661L35.8846 22.8937C34.9436 23.8696 34.1143 24.9463 33.4121 26.1042L33.7752 32.5071Z"
                                fill="#F5F6F4"/>
                        </g>
                    </svg>
                    : null}
            </div>
            <div className={styles.stripe__card__content} >
                <Image
                    className={styles.stripe__card__img}
                    src={process.env.NEXT_PUBLIC_API + image}
                    alt={title}
                    layout='fill'
                    objectFit='contain'
                />
            </div>
        </Link>
    );
});

export default CardItem;