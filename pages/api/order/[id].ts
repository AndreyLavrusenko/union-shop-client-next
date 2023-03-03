import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'GET') {

        try {
            const user = await getServerSession(req, res, authOptions)

            const authHeader = user?.user?.id ?? ''

            if (authHeader) {

                // @ts-ignore
                function getItemInfoByUniqCode(arr: any, callback: any) {
                    const resultArray: any = [];
                    let pending = arr.length;
                    const sql2 = "SELECT uniqCode, title, image FROM product WHERE uniqCode = ?"

                    for (let i = 0; i < pending; i++) {
                        const data2 = [arr[i].uniqCode];

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


                const sql = "SELECT id, total, deliveryPrice, sale, myOrder, userInfo, status, trackNumber FROM orders WHERE userId = ? AND id = ?"
                const data = [authHeader, req.query.id]

                pool.query(sql, data, (error, result: any) => {
                    if (error) return res.status(400).json({message: error, resultCode: 1})

                    const restArrOrders = JSON.parse(result[0]?.myOrder)

                    const arr: any = []

                    getItemInfoByUniqCode(restArrOrders, function (resultArray: any) {
                        restArrOrders.forEach((code: any, i: number) => {
                            resultArray.forEach((item: any) => {
                                if (code.uniqCode === item.uniqCode) {
                                    // Добавление в массив информации из product и orders
                                    arr.push({...item, ...code})
                                }
                            })
                        })

                        return res.status(200).json({arr, result})

                    })

                })

            }

        } catch (err) {
            return res.status(500).json({message: "Что-то пошло не так"})
        }
    }
}


export const config = {
    api: {
        externalResolver: true,
    },
}