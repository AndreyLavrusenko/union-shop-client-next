import React from 'react';
import styles from '../../styles/page/delivery.module.scss'
import DeliveryTypeComponent from "@/components/create-order/create-pages/DeliveryType";
import {getSession} from "next-auth/react";

const DeliveryType = () => {
    return (
        <div className={styles.create}>
            <DeliveryTypeComponent />
        </div>
    );
};

export default DeliveryType;


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
        props: { session }
    }
}