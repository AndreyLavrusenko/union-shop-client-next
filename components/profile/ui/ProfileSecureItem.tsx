import React from 'react';
import styles from "@/styles/page/profile.module.scss";
import Image from "next/image";

interface IProps {
    img: string,
    title: string,
    onClick: (e: any) => void
}

const ProfileSecureItem = ({img, title, onClick}: IProps) => {

    return (
        <div className={styles.secure} onClick={onClick}>
            <div className={[styles.header__wrapper, styles.secure__wrapper].join(' ')}>
                <div className={styles.header__img}>
                    <Image src={img} alt={""}/>
                </div>
                <p>{title}</p>
            </div>
        </div>
    );
};

export default ProfileSecureItem;