import type {NextApiRequest, NextApiResponse} from 'next'
import {pool} from '@/config/db'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {

        const sqlSearchUser = "SELECT id FROM users WHERE email = ?"
        const searchData = [req.body.email]

        pool.query(sqlSearchUser, searchData, (error, result: any[]) => {
            if (error) return res.status(400).json({message: error, resultCode: 1})

            if (result.length === 0) {
                const sqlCreate = "INSERT INTO users (id, email, confirmed, otherServiceLogin) VALUES (?,?,?,?)"
                const dataCreate = [req.body.token, req.body.email, 1, 1]

                pool.query(sqlCreate, dataCreate, (error, result) => {
                    if (error) return res.status(400).json({message: error, resultCode: 1})

                    return res.status(200).json(result)
                })
            } else {
                //Если аккаунт уже есть то проверить через гугл он или нет
                //Если не через гугл то отменить вход в аккаунт или если есть возможность зайти под обычным аккаунтом
                const sqlCheckLogin = "SELECT otherServiceLogin FROM users WHERE id = ?"
                const dataCheckLogin = [result[0].id]

                pool.query(sqlCheckLogin, dataCheckLogin, (error, result: any) => {
                    if (error) return res.status(400).json({message: error, resultCode: 1})

                    if (result.length !== 0) {
                        if (result[0].otherServiceLogin === 0) {
                            return res.status(404).json({resultCode: 1})
                        } else {
                            return res.status(200).json({resultCode: 0})
                        }
                    } else {
                        return res.status(400).json({resultCode: 1})
                    }

                })
            }


        })


    } catch (err) {
        return res.status(500).json({message: "Что-то пошло не так"})
    }
}


export const config = {
    api: {
        externalResolver: true,
    },
}