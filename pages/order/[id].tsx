import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {orderAPI} from "@/api/api";
import styles from '../../styles/page/status.module.scss'
import StatusInfo from "@/components/status/StatusInfo";
import {IStatus} from "@/models/IStatus";
import StatusProducts from "@/components/status/status-products/StatusProducts";
import StatusDetails from "@/components/status/status-details/StatusDetails";
import {getSession} from "next-auth/react";

const Status = () => {
    const router = useRouter()
    const [orderData, setOrderData] = useState<IStatus[]>([])

    const id = router.query.id

    useEffect(() => {
        const getOrderInfo = async () => {
            const {data} = await orderAPI.getOrderById(id)
            setOrderData(data)
        }
        getOrderInfo()
    }, [id])

    if (orderData.length === 0) return


    return (
        <div className={styles.status}>
            <div className={styles.status__wrapper}>
                {/*@ts-ignore*/}
                <StatusInfo orderId={orderData.result[0].id} orderStatus={orderData.result[0].status} />
                {/*@ts-ignore*/}
                <StatusProducts orderProducts={orderData.arr} />
            </div>
            {/*@ts-ignore*/}
            <StatusDetails orderDetails={orderData.result} />
        </div>
    );
};

export default Status;

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