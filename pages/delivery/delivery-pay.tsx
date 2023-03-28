import React from 'react';
import styles from '../../styles/page/delivery.module.scss'
import DeliveryPayComponent from "@/components/create-order/create-pages/DeliveryPay";
import {getSession} from "next-auth/react";


const DeliveryPay = () => {

    return (
        <div className={styles.create}>
            <DeliveryPayComponent />
        </div>
    );
};

export default DeliveryPay;

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