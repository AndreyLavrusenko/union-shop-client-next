import preloader from '../assets/image/service/spinner_blue.svg'
import styles from './preloader.module.scss'
import Image from "next/image";


const Preloader = () => {
    return (
        <Image className={styles.preloader} src={preloader} alt="Preloader"/>
    )
}

export default Preloader;