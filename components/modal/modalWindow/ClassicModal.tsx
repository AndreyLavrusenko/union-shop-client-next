import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {CredentialResponse, GoogleLogin} from '@react-oauth/google';
import union from '../../../assets/image/login/union.png'
import Image from "next/image";
import {signIn} from 'next-auth/react'

import styles from '../modal.module.scss'


interface IProps {
    setModalActive: (status: boolean) => void
    setUnionId: (status: boolean) => void
}

const ClassicModal = ({setModalActive, setUnionId}: IProps) => {
    const dispatch = useAppDispatch()
    const {isLoading, error} = useAppSelector(state => state.user)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function signUpOrRegister() {
        
    }


    const authByUnionId = () => {
        setUnionId(true)
    }

    return (
        <div className={styles.modal__info}>
            <h4 className={styles.modal__info__title}>Введите почту и пароль</h4>
            <p className={styles.modal__info__desc}>Если у вас нет аккаунта, то введите свой адрес электронной почты
                и придумайте пароль</p>
            <form>
                <input
                    type="email"
                    className={styles.modal__info__input}
                    name="email"
                    value={email}
                    placeholder="Введите email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className={styles.modal__info__input}
                    name="password"
                    value={password}
                    placeholder="Введите пароль"
                    onChange={e => setPassword(e.target.value)}
                />
                <p className={styles.modal__info__error}>{error && "Неверный логин или пароль"}</p>
                <button
                    className={styles.modal__info__button}
                    type="submit"
                    disabled={isLoading}
                    onClick={signUpOrRegister}>
                    {isLoading ? "Загрузка..." : "Войти"}
                </button>
            </form>
            <div className={styles.modal__info__or}>
                <span>или</span>
            </div>
            <div className={styles.modal__login}>

                <div>
                    <button
                        className={styles.modal__login__union}
                        type={"button"}
                        onClick={() => signIn()}>
                        Google
                    </button>
                </div>

                <div className={styles.modal__login__union} onClick={authByUnionId}>
                    <Image width={28} src={union} alt="login union"/>
                    <p>Войти через Union ID</p>
                </div>

            </div>
        </div>
    );
};

export default ClassicModal;