import React from 'react';
import styles from '../../styles/page/delivery.module.scss'
import DeliveryInfoComponent from "@/components/create-order/create-pages/DeliveryInfo";
import {getSession} from "next-auth/react";

const DeliveryInfo = () => {
    return (
        <div className={styles.create}>
            <DeliveryInfoComponent />
        </div>
    );
};

export default DeliveryInfo;


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