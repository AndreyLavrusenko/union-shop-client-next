import React from 'react';
import styles from '../../../styles/page/status.module.scss'

interface IProps {
    title: string,
    children: React.ReactNode
}

const StatusDetailsTitle = ({title, children}: IProps) => {
    return (
        <div className={styles.status__details__title}>
            {children}
            <h3 className={styles.status__details__name}>{title}</h3>
        </div>
    );
};

export default StatusDetailsTitle;