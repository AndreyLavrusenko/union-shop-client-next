import type {NextApiRequest, NextApiResponse} from 'next'
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

                const sql = "SELECT status, myOrder, id, trackNumber FROM orders WHERE userId = ? AND status != ?"
                const data = [authHeader, 'process']

                // Функиця для получения данных из product
                // @ts-ignore
                function getItemFromProductTable(arr, callback) {
                    const resultArray: any[] = [];
                    let pending = arr.length;
                    const sql2 = "SELECT title, uniqCode, description, color, subColor, backgroundcolor, image FROM product WHERE uniqCode = ?"

                    for (let i = 0; i < pending; i++) {
                        const data2 = [arr[i]];

                        pool.query(sql2, data2, (error, result: any) => {
                            if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

                            resultArray.push(...result)
                            if (0 === --pending) {
                                callback(resultArray)
                            }
                        })
                    }
                }

                // Получение заказов из orders
                pool.query(sql, data, (error, result: any[]) => {
                    if (error) return res.status(400).json({message: error, resultCode: 1})

                    const myOrder = result.map(item => JSON.parse(item.myOrder))

                    if (myOrder.length !== 0) {
                        // Перебираем заказы и достаем только uniqCode
                        const orderUniqCode: any[] = []
                        myOrder.forEach(item => {
                            item.forEach((code: any) => {
                                orderUniqCode.push(code.uniqCode)
                            })
                        })

                        // Заносим все заказы в один массив
                        const ordersInfo: any[] = []
                        myOrder.forEach((item, i) => {
                            item.forEach((order: any) => {
                                order.id = result[i].id
                                order.performed = result[i].status
                                order.trackNumber = result[i].trackNumber
                                ordersInfo.push(order)
                            })
                        })


                        const arr: any[] = []

                        getItemFromProductTable(orderUniqCode, function (resultArray: any) {
                            orderUniqCode.forEach((code, i) => {
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

            } else {
                return res.status(501).json({resultCode: 1})
            }

        } catch (err) {
            return res.status(500).json({message: "Что-то пошло не так"})
        }
    }

    if (req.method === "POST") {

        const user = await getServerSession(req, res, authOptions)

        const authHeader = user?.user?.id ?? ''

        if (authHeader) {

            const sql_select = "SELECT uniqCode, allProductId, productName, color, totalPriceWithDiscount, size, quantity FROM cart WHERE userId = ?";
            const data_select = [authHeader]

            // Получение товаров из корзины
            pool.query(sql_select, data_select, (error, resultCart: any) => {
                    if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

                    const sql_order = "SELECT status, id FROM orders WHERE userId = ?";
                    const data_order = [authHeader]

                    // Получение всех заказов пользователя
                    pool.query(sql_order, data_order, (error, result: any) => {
                        if (error) return res.status(400).json({message: "Products not found", resultCode: 1})

                        let orderProcessId = null


                        // Просматриваем все заказы пользователи и ищем тот, который еще не готов
                        result.map((item: any) => {
                            if (item.status === 'process') {
                                orderProcessId = item.id
                            }
                        })


                        const total = resultCart[0].totalPriceWithDiscount


                        // Если заказ уже есть, но еще не оплачен, то обновлеям его
                        if (orderProcessId) {
                            const sql_create = "UPDATE orders SET deliveryType = ?, deliveryPrice = ?, myOrder = ?, total = ?, letter = ?, status = ?, orderDate = ? WHERE id = ? AND status = ?"
                            const data_create = [req.body.deliverType, 0, JSON.stringify(resultCart), total, req.body.letter, 'process', new Date(), orderProcessId, 'process']

                            pool.query(sql_create, data_create, (error, result) => {
                                if (error) return res.status(400).json({message: error, resultCode: 1})

                                return res.status(201).json(result)
                            })


                            //Если заказ уже был оплачен и его статус изменился, то создаем новый заказ
                        } else {
                            const sql_create = "INSERT INTO orders (userId, deliveryType, myOrder, total, status, letter, orderDate) VALUES (?, ?, ?, ?, ?, ?, ?)"
                            const data_create = [authHeader, req.body.deliverType, JSON.stringify(resultCart), total, 'process', req.body.letter, new Date()]


                            pool.query(sql_create, data_create, (error, result) => {
                                if (error) return res.status(400).json({message: error, resultCode: 1})

                                return res.status(201).json(result)
                            })
                        }
                    })
                }
            )
        }
    }
}


export const config = {
    api: {
        externalResolver: true,
    },
}