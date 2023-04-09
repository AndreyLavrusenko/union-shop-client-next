import React from 'react';
import ProfileHeader from "@/components/profile/ui/ProfileHeader";
import styles from '../../styles/page/profile.module.scss'
import ProfileInput from "@/components/profile/ui/ProfileInput";

interface IProps {
    img: string,
    title: string,
    description?: string,
    children: React.ReactNode
}

const ProfileItem = ({img, title, description, children}: IProps) => {
    return (
        <div className={styles.profile__item}>
            <ProfileHeader img={img} title={title} description={description}  />
            {children}
        </div>
    );
};

export default ProfileItem;