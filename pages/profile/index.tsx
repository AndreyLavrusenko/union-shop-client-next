import React from 'react';
import ProfileItem from "@/components/profile/ProfileItem";
import user from '../../assets/image/profile/users.svg'
import address from '../../assets/image/profile/building.svg'
import lock from '../../assets/image/profile/lock.svg'
import styles from '../../styles/page/profile.module.scss'
import ProfileInput from "@/components/profile/ui/ProfileInput";

const Profile = () => {
    return (
        <div className={styles.profile}>
            <ProfileItem img={user} title={"Персональные данные"} description={"Имя и фамилия"}>
                <ProfileInput placeholder={"Имя"} name={"name"} value={null} onChange={null} type={"text"} />
                <ProfileInput placeholder={"Фамилия"} name={"lastname"} value={null} onChange={null} type={"text"} />
            </ProfileItem>
            {/*<ProfileItem img={address} title={"Адрес доставки"} description={"Для заказа в один клик и чтобы не тратить время во время покупки"} />*/}
            {/*<ProfileItem img={lock} title={"Безопасность"} />*/}
        </div>
    );
};

export default Profile;