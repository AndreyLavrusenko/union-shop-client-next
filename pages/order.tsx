import React, {useEffect, useState} from 'react';
import {orderAPI} from "@/api/api";

const Order = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const [isPerformed, setIsPerformed] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [isDelivered, setIsDelivered] = useState(false)

    useEffect(() => {
        const getOrders = async () => {
            const {data} = await orderAPI.getOrders()
            setOrders(data)
            setLoading(false)
        }

        getOrders()
    }, [])


    return (
        <div>
            
        </div>
    );
};

export default Order;