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

        if (authHeader) {

            const sql = "SELECT status, myOrder, id, trackNumber FROM orders WHERE userId = ? AND status = ?"
            const data = [authHeader, 'complete']

            // Функиця для получения данных из product
            // @ts-ignore
            function getItemFromProductTable(arr: any, callback: any) {
                const resultArray: any = [];
                let pending = arr.length;
                const sql2 = "SELECT title, uniqCode, description, color, subColor, backgroundcolor, image FROM product WHERE uniqCode = ?"

                for (let i = 0; i < pending; i++) {
                    const data2 = [arr[i]];

                    pool.query(sql2, data2, (error, result) => {
                        if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

                        //@ts-ignore
                        resultArray.push(...result)
                        if (0 === --pending) {
                            callback(resultArray)
                        }
                    })
                }
            }

            // Получение заказов из orders
            pool.query(sql, data, (error, result: any) => {
                if (error) return res.status(400).json({message: error, resultCode: 1})

                const myOrder = result.map((item: any) => JSON.parse(item.myOrder))

                if (myOrder.length !== 0) {
                    // Перебираем заказы и достаем только uniqCode
                    const orderUniqCode: any = []
                    myOrder.forEach((item: any) => {
                        item.forEach((code: any) => {
                            orderUniqCode.push(code.uniqCode)
                        })
                    })

                    // Заносим все заказы в один массив
                    const ordersInfo: any = []
                    myOrder.forEach((item: any, i: number) => {
                        item.forEach((order: any) => {
                            order.id = result[i].id
                            order.performed = result[i].status
                            order.trackNumber = result[i].trackNumber
                            ordersInfo.push(order)
                        })
                    })


                    const arr: any = []

                    getItemFromProductTable(orderUniqCode, function (resultArray: any) {
                        orderUniqCode.forEach((code: any, i: number) => {
                            resultArray.forEach((item: any) => {
                                if (code === item.uniqCode) {
                                    // Добавление в массив информации из product и orders
                                    arr.push({...item, ...ordersInfo[i]})
                                }
                            })
                        })

                        return res.status(200).json(arr)

                    })
                } else {
                    return res.status(200).json([])
                }
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