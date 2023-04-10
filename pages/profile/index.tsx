import React, {useEffect, useState} from 'react';
import ProfileItem from "@/components/profile/ProfileItem";
import user from '../../assets/image/profile/users.svg'
import address from '../../assets/image/profile/building.svg'
import lock from '../../assets/image/profile/lock.svg'
import mail from '../../assets/image/profile/at-sign.svg'
import pass from '../../assets/image/profile/shield-check.svg'
import styles from '../../styles/page/profile.module.scss'
import ProfileInput from "@/components/profile/ui/ProfileInput";
import {profileAPI} from "@/api/api";
import ProfileSecureItem from "@/components/profile/ui/ProfileSecureItem";
import ConfirmEmail from "@/components/profile/ui/ConfirmEmail";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        city: "",
        country: "",
        address: "",
        phone: "",
        index: "",
        region: "",
    })
    const [email, setEmail] = useState("")

    useEffect(() => {
        const getUserInformation = async () => {
           const res = await profileAPI.getUserInfo()
            if (res.status === 200) {
                const data = JSON.parse(res.data[0].userInfo)

                setUserInfo({
                    fullName: data.fullName ?? "",
                    city: data.city ?? "",
                    country: data.country ?? "",
                    address: data.address ?? "",
                    phone: data.phone ?? "",
                    index: data.index ?? "",
                    region: data.region ?? ""
                })
            }
        }

        const getUserEmail = async () => {
            const res = await profileAPI.getUserEmail()

            if (res.status === 200) {
                setEmail(res.data[0].email)
            }
        }

        getUserInformation()
        getUserEmail()
    }, [])


    const onChange = (e: any) => {
        const value = e.target.value;

        setUserInfo({...userInfo, [e.target.name]: value})
    }

    const onSubmit = async (e: any) => {
        e.preventDefault()

        await profileAPI.setUserInfo(JSON.stringify(userInfo))
    }

    return (
        <div className={styles.profile}>
            <form>
                <ProfileItem img={user} title={"Персональные данные"} description={"Имя и фамилия"}>
                    <ProfileInput placeholder={"Имя и фамилия"} name={"name"} value={userInfo.fullName} onChange={onChange} type={"text"}/>
                </ProfileItem>
                <ProfileItem img={address} title={"Адрес доставки"} description={"Для заказа в один клик и чтобы не тратить время во время покупки"}>
                    <ProfileInput placeholder={"Страна"} name={"country"} value={userInfo.country} onChange={onChange} type={"text"}/>
                    <ProfileInput placeholder={"Город"} name={"city"} value={userInfo.city} onChange={onChange} type={"text"}/>
                    <ProfileInput placeholder={"Регион"} name={"region"} value={userInfo.region} onChange={onChange} type={"text"}/>
                    <ProfileInput placeholder={"Адрес"} name={"address"} value={userInfo.address} onChange={onChange} type={"text"}/>
                    <ProfileInput placeholder={"Почтовый индекс"} name={"postcode"} value={userInfo.index} onChange={onChange} type={"number"}/>
                </ProfileItem>
            </form>
            <ProfileItem img={lock} title={"Безопасность"}>
                <ProfileSecureItem img={mail} title={`Email - ${email}`} />
                <ProfileSecureItem img={pass} title={`Сменить пароль`} />
            </ProfileItem>


            <div className={[styles.profile__item, styles.profile__item__confirm].join(' ')}>
                <ConfirmEmail />
            </div>


            <div className={[styles.profile__item, styles.profile__item__button].join(' ')}>
                <button onClick={onSubmit} className={styles.saveButton}>Сохранить</button>
            </div>
        </div>
    );
};

export default Profile;