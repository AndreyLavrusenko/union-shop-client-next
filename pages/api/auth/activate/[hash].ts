import type { NextApiRequest, NextApiResponse } from 'next'
import {pool} from '@/config/db'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import axios from "axios";


// Страница которая просто получает hash и делает запрос на другой endpoint что бы сравнить их

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const hash = req.query.hash
        if (!hash) {
            return res.status(400).json("Не удалось определить пользователя")
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URI}/api/auth/activate/confirm/${hash}`)
        if (response.status === 400) {
            return res.status(400).json("Не удалось определить пользователя")
        } else {
            res.redirect(307, '/status/email-confirm')
        }

    } catch (err) {
        return res.status(500).json("Что-то пошло не так")
    }
}


export const config = {
    api: {
        externalResolver: true,
    },
}