import React from 'react';
import styles from '../../../styles/page/profile.module.scss'

interface IProps {
    title: string,
    description: string,
    passwordError: boolean,
    children:  React.ReactNode
}

const ProfileToggleChange = ({title, description, passwordError, children}: IProps) => {
    return (
        <div
            className={[styles.toggle__main, styles.secure].join(" ")}
            style={passwordError ? {border: '1px solid #e55b5b'} : {border: '1px solid #dedede'}}
        >
            <h4>{title}</h4>
            <p>{description}</p>
            {children}
        </div>
    );
};

export default ProfileToggleChange;