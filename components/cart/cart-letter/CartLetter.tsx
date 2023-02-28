import React, {useEffect, useState} from 'react';
import styles from '../../../styles/page/cart.module.scss'

const CartLetter = () => {
    const [isInput, setIsInput] = useState(false)
    const [letter, setLetter] = useState("")

    useEffect(() => {
        if (localStorage.getItem("letter")) {
            setLetter(localStorage.getItem("letter"))
        }
    }, [])

    const saveLetterText = (text: string) => {
        setLetter(text);
        localStorage.setItem('letter', text);
    }

    return (
        <div className={styles.cart__letter}>
            <div className={styles.cart__letter__wrapper}>
                {isInput
                    ? <>
                        <div className={styles.cart__letter__text}>
                            <input
                                type="text"
                                placeholder="Ваш текст"
                                className={styles.cart__letter__input}
                                value={letter}
                                onChange={e => saveLetterText(e.target.value)}
                            />
                        </div>
                        <button
                            className={styles.cart__letter__button}
                            onClick={() => setIsInput(false)}>
                            Сохранить
                        </button>
                    </>
                    : <>
                        <div className={styles.cart__letter__text}>
                            {letter === ""
                                ? <>
                                    <svg width="25" height="21" viewBox="0 0 25 21" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g filter="url(#filter0_d_4602_9405)">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M5.03544 4C5.27806 2.30385 6.73676 1 8.5 1H12.5C14.2664 1 15.7275 2.30885 15.9659 4.00936C15.9346 4.00322 15.9023 4 15.8691 4H5.03544ZM5 5V8.5C5 10.433 6.567 12 8.5 12H12.5C14.3591 12 15.8796 10.5506 15.9932 8.7201L13.7967 10.6725C13.5898 10.8564 13.3355 10.9807 13.0643 11.0379L12.5507 11.1462C12.0112 11.26 11.4865 11.1032 11.1239 10.7809C11.058 10.7223 10.997 10.6576 10.9422 10.5878C10.6063 10.2208 10.4741 9.70753 10.7109 9.19305L10.7316 9.14797C10.7484 9.11153 10.7669 9.07579 10.787 9.04084L10.7979 9H5.86914C5.593 9 5.36914 8.77614 5.36914 8.5C5.36914 8.22386 5.593 8 5.86914 8H10.8691C11.0401 8 11.191 8.0858 11.2812 8.21668L12.6499 7H5.86914C5.593 7 5.36914 6.77614 5.36914 6.5C5.36914 6.22386 5.593 6 5.86914 6H13.7749L14.8999 5H5ZM16.9919 7.51107C16.9972 7.54029 17 7.57024 17 7.60063V8.5C17 10.9853 14.9853 13 12.5 13H8.5C6.01472 13 4 10.9853 4 8.5V4.5C4 2.01472 6.01472 0 8.5 0H12.5C14.6692 0 16.4797 1.53468 16.9054 3.57778L17.7595 2.82897C18.3824 2.28284 19.3924 2.28284 20.0153 2.82897L20.046 2.85586C20.6689 3.40199 20.6689 4.28744 20.046 4.83356L16.9919 7.51107ZM12.2203 10.1828C12.2756 10.1797 12.3323 10.1687 12.3891 10.1486L12.4405 10.1304C12.5068 10.1069 12.567 10.072 12.6175 10.0277L19.294 4.17433C19.5017 3.99229 19.5017 3.69714 19.294 3.5151L19.2633 3.4882C19.0557 3.30616 18.7191 3.30616 18.5114 3.4882L11.8349 9.34158C11.7844 9.38589 11.7445 9.43868 11.7178 9.49679L11.697 9.54188C11.5783 9.79997 11.7381 10.0571 11.9886 10.1487C12.0589 10.1726 12.1371 10.1853 12.2203 10.1828Z"
                                                  fill="black"/>
                                        </g>
                                        <defs>
                                            <filter id="filter0_d_4602_9405" x="0" y="0" width="24.5137" height="21"
                                                    filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                <feColorMatrix in="SourceAlpha" type="matrix"
                                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                               result="hardAlpha"/>
                                                <feOffset dy="4"/>
                                                <feGaussianBlur stdDeviation="2"/>
                                                <feComposite in2="hardAlpha" operator="out"/>
                                                <feColorMatrix type="matrix"
                                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                                <feBlend mode="normal" in2="BackgroundImageFix"
                                                         result="effect1_dropShadow_4602_9405"/>
                                                <feBlend mode="normal" in="SourceGraphic"
                                                         in2="effect1_dropShadow_4602_9405"
                                                         result="shape"/>
                                            </filter>
                                        </defs>
                                    </svg>
                                    <p>Добавить поздравительное письмо в подарок</p>
                                </>
                                : letter
                            }
                        </div>
                        <button
                            className={styles.cart__letter__button}
                            onClick={() => setIsInput(true)}
                        >Добавить</button>
                    </>
                }

            </div>
        </div>
    )
};

export default CartLetter;