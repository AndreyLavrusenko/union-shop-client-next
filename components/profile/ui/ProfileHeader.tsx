import React from 'react';
import styles from '../../../styles/page/profile.module.scss'
import Image from 'next/image'

interface IProps {
    img: string,
    title: string,
    description?: string
}

const ProfileHeader = ({img, title, description}: IProps) => {
    return (
        <div className={styles.header}>
            <div className={styles.header__wrapper}>
                <div className={styles.header__img}>
                    <Image src={img} alt={""}/>
                </div>
                <h2>{title}</h2>
            </div>
            <div className={styles.header__title}>
                {description ? <p>{description}</p> : null}
            </div>
        </div>
    );
};

export default ProfileHeader;