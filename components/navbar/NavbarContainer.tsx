import React, {useEffect, useState} from 'react';
import Navbar from "@/components/navbar/Navbar";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {IUser} from "@/models/IUser";


interface IProps {
    quantityState: number
    setQuantityState: (n: number) => void
}

const NavbarContainer = ({quantityState, setQuantityState}: IProps) => {
    const dispatch = useAppDispatch()
    const user = useAppSelector<IUser>(state => state.user)
    // Открыта боковая панель или нет
    const [navbar, setNavbar] = useState(false)

    const router = useRouter()

    // Пишет кол-во товара в корзине
    // useEffect(() => {
    //     const getCartCount = async () => {
    //         const data = await cartAPI.getCartQuantity()
    //         setQuantityState(data)
    //     }
    //     getCartCount()
    // }, [rerenderCart, user])

    // Если пользователь зашел в аккану
    useEffect(() => {
        if (document.documentElement.clientWidth < 1000) {
            setNavbar(false)
        }
    }, [user])

    // Показывать боковую панель взависимости от размера экрана
    useEffect(() => {
        if (document.documentElement.clientWidth < 1000) {
            setNavbar(false)
        } else {
            setNavbar(true)
        }
    }, [])

    const checkNavbar = (e: any) => {
        if (e.currentTarget.innerWidth <= 1000) {
            if (!(e.target === document.querySelector('.js-side') || document.querySelector(".js-side")?.contains(e.target))) {
                setNavbar(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', checkNavbar)

        return () => {
            window.removeEventListener('click', checkNavbar)
        }
    }, [])


    // Убирает боковое меню при уменьшении экрана
    useEffect(() => {
        window.addEventListener('resize', (e: any) => {
            if (e.currentTarget.innerWidth <= 1000) {
                setNavbar(false)
            } else {
                setNavbar(true)
            }
        })
    }, [])

    const closeNavbar = (status: boolean) => {
        if (document.documentElement.clientWidth < 1000) {
            setNavbar(status)
        }
    }

    const handleLogout = async () => {
        // await authAPI.logout(dispatch)
        if (document.documentElement.clientWidth < 1000) {
            setNavbar(false)
        }
        await router.push('/')
    }


    return (
        <Navbar
            quantityState={quantityState}
            navbar={navbar}
            closeNavbar={closeNavbar}
            isAuth={user}
            handleLogout={handleLogout}
        />
    );
};

export default NavbarContainer;