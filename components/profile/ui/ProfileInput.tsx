import React from 'react';
import styles from '../../../styles/page/profile.module.scss'

interface IProps {
    placeholder: string,
    name: string,
    value: string,
    onChange: (e: any) => void
    type: string,
}

const ProfileInput = ({placeholder, name, onChange, value, type="text"}: IProps) => {
    return (
        <div>
            <input className={styles.input} type={type} id={name} autoComplete={name} placeholder={placeholder} value={value} onChange={onChange} name={name}/>
        </div>
    );
};

export default ProfileInput;