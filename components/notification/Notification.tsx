import React from 'react';
import Link from "next/link";
import {createPortal} from "react-dom";

import styles from './notification.module.scss'

interface IProps {
    toastActive: boolean,
    setToastActive: (status: boolean) => void,
    color: string,
    sendColor: string,
    text: string,
    isError: boolean
}

const Notification = ({text, isError, toastActive, setToastActive, sendColor, color}: IProps) => {

    if (toastActive) {
        setTimeout(() => {
            setToastActive(false)
        }, 2000)
    }

    if (process.browser) {
        return createPortal(
            <Link
                href={'/cart'}
                onClick={() => setToastActive(false)}
                style={!isError
                    ? {backgroundColor: color, borderLeft: `7px solid ${sendColor}`}
                    : {backgroundColor: "#FBDDDD", borderLeft: "7px solid #EB5757"}}
                className={toastActive
                    ? styles.toast + " " + styles.active + " " + styles.toast_message + " " + styles.toast_default
                    : styles.toast + " " + styles.toast_message + " " + styles.toast_default}
            >
                {!isError
                    ?
                    <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M39.0002 68.64C57.9546 68.64 73.3202 53.2744 73.3202 34.32C73.3202 15.3656 57.9546 0 39.0002 0C20.0458 0 4.68018 15.3656 4.68018 34.32C4.68018 44.9926 9.55175 54.5274 17.1925 60.822C17.2047 60.832 17.1939 60.8515 17.1789 60.8464V60.8464C17.1698 60.8433 17.1602 60.8501 17.1602 60.8598V71.5042C17.1602 74.4834 20.3004 76.4171 22.9607 75.076L34.9722 69.0212C35.6356 68.6867 36.3788 68.5494 37.1207 68.5894C37.743 68.623 38.3696 68.64 39.0002 68.64Z"
                              fill="#6FCF97"/>
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M50.3012 24.3464C51.3603 25.1585 51.5625 26.6745 50.7531 27.7357L38.7427 43.4829C38.3193 44.0382 37.6774 44.3832 36.9817 44.4295C36.2861 44.4758 35.6044 44.2189 35.1114 43.7246L27.4884 36.0815C26.5456 35.1363 26.5456 33.6064 27.4884 32.6612V32.6612C28.4346 31.7124 29.9715 31.7124 30.9177 32.6612L36.5784 38.3368L46.9033 24.7994C47.7155 23.7344 49.2382 23.5314 50.3012 24.3464V24.3464Z"
                              fill="white"/>
                    </svg>

                    :
                    <svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M47.8057 67.6794C48.1346 67.4706 48.4935 67.3124 48.8667 67.2006C63.012 62.9621 73.3202 49.8448 73.3202 34.32C73.3202 15.3656 57.9546 0 39.0002 0C20.0458 0 4.68018 15.3656 4.68018 34.32C4.68018 47.8227 12.478 59.5042 23.816 65.1068C23.8288 65.1132 23.8236 65.1326 23.8093 65.1315C23.8002 65.1308 23.7932 65.1396 23.796 65.1483L26.904 74.9903C27.6949 77.4949 30.644 78.5705 32.8616 77.1631L47.8057 67.6794Z"
                              fill="#EB5757"/>
                        <path
                            d="M48.8137 27.6379C49.6421 26.8095 49.6421 25.4664 48.8137 24.638L48.3622 24.1865C47.5338 23.3581 46.1907 23.3581 45.3623 24.1865L39.0002 30.5486L32.6381 24.1865C31.8097 23.3581 30.4666 23.3581 29.6382 24.1865L29.1867 24.638C28.3583 25.4664 28.3583 26.8095 29.1867 27.6379L35.5488 34L29.1867 40.362C28.3583 41.1904 28.3583 42.5336 29.1867 43.362L29.6382 43.8134C30.4666 44.6419 31.8097 44.6419 32.6381 43.8134L39.0002 37.4514L45.3623 43.8134C46.1907 44.6418 47.5338 44.6419 48.3622 43.8134L48.8137 43.362C49.6421 42.5336 49.6421 41.1904 48.8137 40.362L42.4516 34L48.8137 27.6379Z"
                            fill="white"/>
                    </svg>

                }
                <div className={styles.toast__body}>{!isError ? text : "Произошла ошибка"}</div>
            </Link>,
            document.querySelector('#notification') as HTMLElement
        );
    } else {
        return <></>
    }
};

export default Notification;