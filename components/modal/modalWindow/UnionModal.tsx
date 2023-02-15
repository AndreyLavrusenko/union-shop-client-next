import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/hook/redux";

import styles from '../modal.module.scss'
import {loginStart, loginSuccess, loginUnionFailure} from "@/redux/reducer/userSlice";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

interface IProps {
    setModalActive: (status: boolean) => void
    setUnionId: (status: boolean) => void
}

const UnionModal = ({setUnionId, setModalActive}: IProps) => {
    const dispatch = useAppDispatch()
    const {unionError, isLoading} = useAppSelector(state => state.user)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function singUpByUnion(e: any) {
        e.preventDefault()

        dispatch(loginStart())

        try {

            const status = await signIn('unionId', {
                redirect: false,
                email,
                password,
                callbackUrl: '/'
            })

            if (status?.ok) {
                setModalActive(false)

                setEmail("")
                setPassword("")

                dispatch(loginSuccess())
            } else {
                dispatch(loginUnionFailure())
            }

        } catch (err) {}
    }

    return (
        <div className={styles.modal__info}>
            <h4 className={styles.modal__info__title}>Войти с Union ID</h4>
            <p className={styles.modal__info__desc}>Введите свой логин и пароль от аккаунта UnionUniverse</p>
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
                <a href="https://unionuniverse.one/content/login/login-start.php" className={styles.modal__info__link}>Не помню
                    пароль</a>
                <p className={styles.modal__info__error}>{unionError && "Неверный логин или пароль"}</p>
                <button
                    className={styles.modal__info__button}
                    type="submit"
                    disabled={isLoading}
                    onClick={singUpByUnion}>
                    {isLoading ? "Загрузка..." : "Войти"}
                </button>
                <a href="https://unionuniverse.one/content/login/reg.php">
                    <button
                        type="button"
                        className={styles.modal__info__button + " " + styles.modal__info__button__link}>
                        Создать Union ID
                    </button>
                </a>
            </form>
            <p className={styles.modal__info__back} onClick={() => setUnionId(false)}>Вернуться назад</p>
        </div>
    );
};

export default UnionModal;