import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import union from '../../../assets/image/login/union.png'
import google from '../../../assets/image/icon/Google-Original.svg'
import Image from "next/image";
import {signIn} from 'next-auth/react'
import {loginOrRegFailure, loginStart, loginSuccess} from "@/redux/reducer/userSlice";

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


    async function signUpOrRegister(e: any) {
        e.preventDefault()
        dispatch(loginStart())

        try {
            const status = await signIn('union-shop', {
                redirect: false,
                email: email,
                password: password,
                callbackUrl: "/",
            })

            if (status?.ok) {
                setModalActive(false)

                setEmail("")
                setPassword("")

                dispatch(loginSuccess())
            } else {
                dispatch(loginOrRegFailure())
            }

        } catch (err) {}
    }


    const authByUnionId = () => {
        setUnionId(true)
    }

    async function authByGoogle() {
       await signIn('google', {callbackUrl: process.env.NEXT_PUBLIC_BACK_URI})
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
                    onClick={e => signUpOrRegister(e)}>
                    {isLoading ? "Загрузка..." : "Войти"}
                </button>
            </form>
            <div className={styles.modal__info__or}>
                <span>или</span>
            </div>
            <div className={styles.modal__login}>
                <div className={styles.modal__login__mobile}>
                    <button className={styles.modal__login__google} type={"button"} onClick={() => authByGoogle()}>
                        <Image width={28} src={google} alt="google"/>
                        <p>Google</p>
                    </button>
                </div>

                {/*<div className={styles.modal__login__union} onClick={authByUnionId}>*/}
                {/*    <Image width={28} src={union} alt="union"/>*/}
                {/*    <p>Union ID</p>*/}
                {/*</div>*/}

            </div>
        </div>
    );
};

export default ClassicModal;