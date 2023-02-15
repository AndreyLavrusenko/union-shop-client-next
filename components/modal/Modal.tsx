import React, {useState} from 'react';
import {createPortal} from "react-dom";
import Image from "next/image";
import logo from '../../assets/image/logo/header_logo.svg'

import styles from './modal.module.scss'
import ClassicModal from "@/components/modal/modalWindow/ClassicModal";
import UnionModal from "@/components/modal/modalWindow/UnionModal";

interface IProps {
    active: boolean
    setModalActive: (status: boolean) => void
}

const Modal = ({active, setModalActive}: IProps) => {
    const [unionId, setUnionId] = useState(false)

    return createPortal(
        <div
            className={active ?  styles.modal + " " + styles.active : styles.modal}
            onClick={() => setModalActive(false)}
        >
            <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
                <div className={styles.modal__header}>
                    <Image className={styles.modal__headerLogo} src={logo} alt="logo"/>
                    <div
                        className={styles.modal__headerClose}
                        onClick={() => setModalActive(false)}
                    />
                </div>
                {unionId
                    ? <UnionModal setModalActive={setModalActive} setUnionId={setUnionId}/>
                    : <ClassicModal setModalActive={setModalActive} setUnionId={setUnionId}/>
                }
            </div>
        </div>,
        document.querySelector('#portal') as HTMLElement
    )
};

export default Modal;