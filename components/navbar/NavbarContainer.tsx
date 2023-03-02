import React, {useEffect, useState} from 'react';
import Navbar from "@/components/navbar/Navbar";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "@/hook/redux";
import {useSession} from "next-auth/react";
import {cartAPI} from "@/api/api";
import {setCartQuantity} from "@/redux/reducer/cartSlice";


interface IProps {}

const NavbarContainer = ({}: IProps) => {
    const {quantity} = useAppSelector(state => state.cart)

    const dispatch = useAppDispatch()
    // Открыта боковая панель или нет
    const [navbar, setNavbar] = useState(false)

    // Перерисовка корзины при изменении кол-ва объектов
    const [rerenderCart, setRerenderCart] = useState(false)

    const {data: user} = useSession()

    // Пишет кол-во товара в корзине
    useEffect(() => {
        const getCartCount = async () => {
            const data = await cartAPI.getCartQuantity()
            dispatch(setCartQuantity(data))
        }
        getCartCount().then(() => setRerenderCart(prev => !prev))
    }, [rerenderCart, user])

    // Если пользователь зашел в аккану
    useEffect(() => {
        if (document.documentElement.clientWidth < 1000) {
            setNavbar(false)
        }
    }, [user?.user])

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


    return (
        <Navbar
            quantityState={quantity}
            navbar={navbar}
            closeNavbar={closeNavbar}
            isAuth={user?.user}
        />
    );
};

export default NavbarContainer;