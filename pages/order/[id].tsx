import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {orderAPI} from "@/api/api";

const Status = () => {
    const router = useRouter()
    const [orderData, setOrderData] = useState([])

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
        <div>

        </div>
    );
};

export default Status;