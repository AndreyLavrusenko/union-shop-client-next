import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const user = await getServerSession(req, res, authOptions)

        const authHeader = user?.user?.id ?? ''

        console.log(authHeader)

        if (authHeader) {

            const getQuantitySql = "SELECT myOrder FROM orders WHERE userId = ? AND status = ?"
            const getQuantityData = [authHeader, 'process']

            pool.query(getQuantitySql, getQuantityData, (error, result: any[]) => {

                const myOrder = result.map(item => JSON.parse(item.myOrder))

                const orderUniqCode: any[] = []
                if (myOrder.length !== 0) {
                    // Перебираем заказы и достаем только номер в all_products и количество в заказе
                    myOrder.forEach(item => {
                        item.forEach((code: any) => {
                            const obj: any = {}
                            obj.allProductId = code.allProductId;
                            obj.quantity = code.quantity
                            orderUniqCode.push(obj)
                        })
                    })
                }

                //Уменьшить количество товара в таблице all_products
                orderUniqCode.map(orderItem => {
                    const decrease_sql = "UPDATE all_products SET count = count - ?, sold = sold + ? WHERE id = ?"
                    const decrease_data = [orderItem.quantity, orderItem.quantity, orderItem.allProductId]

                    pool.query(decrease_sql, decrease_data, (error_decrease, result_decrease) => {
                        if (error_decrease) return res.status(400).json({message: error_decrease, resultCode: 1})
                    })
                })

                const sql = "UPDATE orders SET status = ? WHERE userId = ? AND status = ?"
                const data = ['performed', authHeader, 'process']

                pool.query(sql, data, (error, result) => {
                    if (error) return res.status(400).json({message: error, resultCode: 1})

                    const cart_sql = "DELETE FROM cart WHERE userId = ?"
                    const cart_data = [authHeader]

                    pool.query(cart_sql, cart_data, (error) => {
                        if (error) return res.status(400).json({message: error, resultCode: 1})

                        return res.status(200).json({resultCode: 0})
                    })
                })

            })
        }

    } catch (err) {
        return res.status(500).json({message: "Что-то пошло не так"})
    }
}


export const config = {
    api: {
        externalResolver: true,
    },
}