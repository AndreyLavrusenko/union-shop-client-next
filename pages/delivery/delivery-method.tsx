import React from 'react';
import styles from '../../styles/page/delivery.module.scss'
import DeliveryMethodComponent from "@/components/create-order/create-pages/DeliveryMethod";
import {getSession} from "next-auth/react";


const DeliveryMethod = () => {
    return (
        <div className={styles.create}>
            <DeliveryMethodComponent />
        </div>
    );
};

export default DeliveryMethod;


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