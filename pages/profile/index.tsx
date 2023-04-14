import React, {useEffect, useState} from 'react';
import ProfileItem from "@/components/profile/ProfileItem";
import userImage from '../../assets/image/profile/users.svg'
import address from '../../assets/image/profile/building.svg'
import lock from '../../assets/image/profile/lock.svg'
import mail from '../../assets/image/profile/at-sign.svg'
import pass from '../../assets/image/profile/shield-check.svg'
import styles from '../../styles/page/profile.module.scss'
import ProfileInput from "@/components/profile/ui/ProfileInput";
import {authAPI, profileAPI} from "@/api/api";
import ProfileSecureItem from "@/components/profile/ui/ProfileSecureItem";
import ConfirmEmail from "@/components/profile/ui/ConfirmEmail";
import {getSession} from "next-auth/react";
import ProfileToggleChange from "@/components/profile/ui/ProfileToggleChange";

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
    const [confirmEmail, setConfirmEmail] = useState(true)
    const [loginByThirdServices, setLoginByThirdServices] = useState(false)
    const [toggleEmail, setToggleEmail] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)
    const [emailSendResponse, setEmailSendResponse] = useState("")

    useEffect(() => {
        const getUserInformation = async () => {
            const res = await profileAPI.getUserInfo()
            if (res.status === 200) {
                if (res.data[0]) {
                    const data = JSON.parse(res.data[0].userInfo)

                    if (data) {
                        setUserInfo({
                            fullName: data?.fullName ?? "",
                            city: data?.city ?? "",
                            country: data?.country ?? "",
                            address: data?.address ?? "",
                            phone: data?.phone ?? "",
                            index: data?.index ?? "",
                            region: data?.region ?? ""
                        })
                    }
                }

            }
        }

        const getUserEmail = async () => {
            const res = await profileAPI.getUserEmail()

            if (res.status === 200) {
                if (res.data[0]) {
                    setEmail(res.data[0].email)
                    setConfirmEmail(!!res.data[0].confirmed)
                    setLoginByThirdServices(!!res.data[0].otherServiceLogin)
                }
            }
        }

        getUserInformation()
        getUserEmail()
    }, [])

    const sendEmailToConfirm = async () => {
        const res = await authAPI.sendConfirmEmail(email)
        if (res.data) {
            setEmailSendResponse(res.data.message)
        }
    }


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
                <ProfileItem img={userImage} title={"Персональные данные"} description={"Имя и фамилия"}>
                    <ProfileInput placeholder={"Имя и фамилия"} name={"fullName"} value={userInfo.fullName}
                                  onChange={onChange} type={"text"}/>
                </ProfileItem>
                <ProfileItem img={address} title={"Адрес доставки"}
                             description={"Для заказа в один клик и чтобы не тратить время во время покупки"}>
                    <ProfileInput placeholder={"Страна"} name={"country"} value={userInfo.country} onChange={onChange}
                                  type={"text"}/>
                    <ProfileInput placeholder={"Город"} name={"city"} value={userInfo.city} onChange={onChange}
                                  type={"text"}/>
                    <ProfileInput placeholder={"Регион"} name={"region"} value={userInfo.region} onChange={onChange}
                                  type={"text"}/>
                    <ProfileInput placeholder={"Адрес"} name={"address"} value={userInfo.address} onChange={onChange}
                                  type={"text"}/>
                    <ProfileInput placeholder={"Почтовый индекс"} name={"index"} value={userInfo.index}
                                  onChange={onChange} type={"number"}/>
                </ProfileItem>
            </form>
            {
                loginByThirdServices
                    ? null
                    : <ProfileItem img={lock} title={"Безопасность"}>


                        <ProfileSecureItem onClick={() => setToggleEmail(prev => !prev)} img={mail} title={`Email - ${email}`}/>
                        {
                            toggleEmail
                                ? <ProfileToggleChange
                                    title={"Смена почты"}
                                    description={"На новый адрес электронной почты придет письмо для подтверждения смены электронной почты"}>
                                    <div>
                                        <input type="email" placeholder={"Новый email"}/>
                                    </div>
                                </ProfileToggleChange>
                                : null
                        }


                        <ProfileSecureItem  onClick={() => setTogglePassword(prev => !prev)} img={pass} title={`Сменить пароль`}/>
                        {
                            togglePassword
                                ? <ProfileToggleChange
                                    title={"Смена пароля"}
                                    description={"Для того что бы изменить пароль сначала введите старый пароль, а затем придумайте новый"}>
                                    <div>
                                        <input type="password" placeholder={"Старый пароль"}/>
                                    </div>
                                </ProfileToggleChange>
                                : null
                        }

                    </ProfileItem>
            }


            {/* Если email подтвержден или вход черезе гугл то не показываю плашку */}
            {
                confirmEmail
                    ? null
                    : <>
                        <div onClick={sendEmailToConfirm} className={[styles.profile__item, styles.profile__item__confirm].join(' ')}>
                            <ConfirmEmail/>
                        </div>
                        <div className={styles.profile__email_again}>{emailSendResponse}</div>
                    </>
            }


            <div className={[styles.profile__item, styles.profile__item__button].join(' ')}>
                <button onClick={onSubmit} className={styles.saveButton}>Сохранить</button>
            </div>
        </div>
    );
};

export default Profile;


export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {session}
    }
}