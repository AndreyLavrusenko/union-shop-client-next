import React from 'react';
import styles from '../../styles/page/official.module.scss'

interface IProps {
    title: string,
    color?: string,
}

const Title = ({title, color}: IProps) => {
    return (
        <div className={styles.title_main}>
            <h1 style={{backgroundColor: color}} className={styles.title}>{title}</h1>
        </div>
    );
};

export default Title;