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

                function getItemCountFromAllProducts(arr: any[], callback: any) {
                    const resultArray: any[] = [];
                    let pending = arr.length;
                    const sql2 = "SELECT count, id FROM all_products WHERE id = ?"

                    for (let i = 0; i < pending; i++) {
                        const data2 = [arr[i].allProductId];

                        pool.query(sql2, data2, (error, result) => {
                            if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

                            // @ts-ignore
                            resultArray.push(...result)
                            if (0 === --pending) {
                                callback(resultArray)
                            }
                        })
                    }
                }


                // Проверка все ли товары есть в наличии

                const arr: any[] = []
                getItemCountFromAllProducts(orderUniqCode, function (resultArray: any[]) {

                    orderUniqCode.forEach((result, i) => {
                        resultArray.forEach((item, j) => {
                            if (result.allProductId === item.id) {
                                if (item.count - result.quantity < 0) {
                                    arr.push(false)
                                } else {
                                    arr.push(true)
                                }
                            }
                        })
                    })

                    const returnValue = arr.every(item => item)

                    return res.status(200).json(returnValue)
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