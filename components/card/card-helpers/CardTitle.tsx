import React from 'react'
import styles from '../card.module.scss'

interface IProps {
    title: string,
    secondTitle: string
}

const CardTitle = ({title, secondTitle}: IProps) => {
    return (
        <div className={styles.stripe__title}>
            <div className={styles.stripe__title__first}>{title}</div>
            <div className={styles.stripe__title__second}>{secondTitle}</div>
        </div>
    )
}

export default CardTitle