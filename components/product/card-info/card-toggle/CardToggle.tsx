import React, {useState} from 'react';
import Image from "next/image";
import arrow from '../../../../assets/image/icon/arrow.svg'

import styles from '../cardinfo.module.scss'

interface IProps {
    data: string,
    title: string,
}

const CardToggle = ({data, title}: IProps) => {
    // Открыты или закрыты блоки с информацией
    const [block, setBlock] = useState(false)

    const string = data.split('. ')

    if (data.length > 1) {
        return (
            <>
                <div className={styles.cardinfo__toggle} onClick={() => setBlock(!block)}>
                    <div className={styles.cardinfo__toggle__title}>{title}</div>
                    <Image style={block ? {transform: "rotate(180deg)"} : null} src={arrow} alt="open"/>
                </div>
                {block ?
                    <div className={styles.cardinfo__toggle__text}>
                        {string.map((item, i) => {
                            return <div key={i}>{item}; <br/></div>
                        })}
                    </div>
                    : null
                }
            </>
        )
    }
};

export default CardToggle;