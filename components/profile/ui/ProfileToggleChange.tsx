import React from 'react';
import styles from '../../../styles/page/profile.module.scss'

interface IProps {
    title: string,
    description: string,
    children:  React.ReactNode
}

const ProfileToggleChange = ({title, description, children}: IProps) => {
    return (
        <div className={[styles.toggle__main, styles.secure].join(" ")}>
            <h4>{title}</h4>
            <p>{description}</p>
            {children}
        </div>
    );
};

export default ProfileToggleChange;