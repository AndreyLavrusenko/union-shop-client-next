import type {NextApiRequest, NextApiResponse} from 'next'
import {pool} from '@/config/db'
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import md5 from 'md5'
import nodemailer from "nodemailer";
import {v4 as uuidv4} from "uuid";
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";


const redis = new Redis({
    url: process.env.NEXT_UPSTASH_REDIS_REST_URL,
    token: process.env.NEXT_UPSTASH_REDIS_REST_TOKEN,
})


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    try {
        const user = await getServerSession(req, res, authOptions)

        const authHeader = user?.user?.id ?? ''

        if (authHeader) {

            // Проверка были отправлены какие нибудь данные или нет
            if (!req.body.data.email || !req.body.data.password) return res.status(400).json({resultCode: 1})

            const hash = md5(req.body.data.password)

            // Проверка совпадают ли пароли у пользователя
            const sql = "SELECT password, email FROM users WHERE id = ?"
            const data = [authHeader]

            pool.query(sql, data, (error, result: any) => {
                if (error) return res.status(400).json({message: error, resultCode: 1})

                if (result[0]) {
                    // Если пользователь с таким паролем найден
                    if (result[0].password === hash) {

                        // Ищем есть ли пользователи с новой почтой (их не должно быть)
                        const sqlSearchAccountByEmail = "SELECT id FROM users WHERE email = ?"
                        const dataSearch = [req.body.data.email]

                        pool.query(sqlSearchAccountByEmail, dataSearch, async (error, result: any) => {
                            if (error) return res.status(400).json({message: error, resultCode: 1})

                            // Если пользователей не с такой почтой не найдено
                            if (result.length === 0) {

                                // Успешный запрос можно отправлять всего 1 раз в 12 часов
                                const ratelimit = new Ratelimit({
                                    redis: redis,
                                    limiter: Ratelimit.fixedWindow(1, "30 s"), //FIXME Поменять на 43200
                                });

                                const identifier = "api";
                                const result = await ratelimit.limit(identifier);
                                res.setHeader('X-RateLimit-Limit', result.limit)
                                res.setHeader('X-RateLimit-Remaining', result.remaining)

                                if (!result.success) {
                                    return res.json({
                                        errorMessage: 'Почту можно менять раз в 12 часов',
                                        rateLimitState: result
                                    })
                                } else {
                                    const hashEmail = uuidv4() // Для подтверждения email

                                    const sqlSaveNewEmailInDb = "UPDATE users SET newEmail = ?, newEmailHash = ? WHERE id = ?"
                                    const dataSaveNewEmail = [req.body.data.email, hashEmail, authHeader]

                                    // Перед отправкой письма записываю hash и новый email в бд
                                    pool.query(sqlSaveNewEmailInDb, dataSaveNewEmail, async (error, result: any) => {
                                        if (error) return res.status(400).json({message: error, resultCode: 1})


                                        // Если почта свободна то отсылаем email с подтверждением на почту
                                        const transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                                user: process.env.NEXT_EMAIL, // generated ethereal user
                                                pass: process.env.NEXT_EMAIL_PASSWORD, // generated ethereal password
                                            },
                                        });

                                        const mailOptions = {
                                            from: process.env.NEXT_EMAIL,
                                            to: req.body.data.email,
                                        }

                                        try {
                                            await transporter.sendMail({
                                                ...mailOptions,
                                                subject: "Union Shop - Подтверждение нового email", // Subject line
                                                text: "Подтверждение новой почты", // plain text body
                                                html: `
                                                    <div style="background-color: white; padding: 40px; height: 100%;">
                                                        <h3 style="font-weight: 700;
                                                                    font-size: 48px;
                                                                    line-height: 100%;
                                                                    text-align: center;
                                                                    letter-spacing: -0.016em;
                                                                    color: #191847;
                                                                    "
                                                        >Смена Email</h3>
                                                         <div style="margin: 0 auto;
                                                                     display: flex;
                                                                     padding-top: 20px;
                                                                     padding-bottom: 70px;
                                                                     "
                                                         >
                                                            <div style="max-width: 880px; padding-left: 15px; margin: 0 auto;">
                                                                <h4 style="margin: 0; padding-bottom: 5px;">Добро пожаловать в ЮНИОН!</h4>
                                                                <p style="margin: 0;">
                                                                Чтобы подтвердить учетную запись, Вам необходимо перейти по ссылке. <br>
                                                                Если это были не вы, то смените пароль от учетной записи на странице профиля <br><br>
                                                                Если у Вас возникли вопросы, обязательно обратитесь в службу поддержки.</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div style="text-align: center"
                                                        >
                                                            <a 
                                                                style="
                                                                    font-weight: 400;
                                                                    font-size: 14px;
                                                                    line-height: 17px;
                                                                    color: #FFFFFF;
                                                                    background: #1468E7;
                                                                    border-radius: 8px;
                                                                    padding: 12px 24px;
                                                                    text-decoration: none;
                                                                    text-align: center;
                                                                "
                                                                target="_blank" 
                                                                href="${process.env.NEXT_PUBLIC_BACK_URI}/api/profile/activate-new-email/${hashEmail}"
                                                                >
                                                                Актививировать
                                                            </a>
                                                        </div>
                                                        <br><br><br>
                                                    </div>
                                                `,
                                            })
                                            res.status(200).json({message: 'Сообщение отправлено на почту', resultCode: 0})
                                        } catch (err) {
                                            console.log(err)
                                        }

                                    })
                                }
                            } else {
                                // Почта уже использвуется
                                return res.json({errorMessage: "Эта почта уже использвуется", resultCode: 1})
                            }
                        })

                    } else {
                        return res.json({resultCode: 1, errorMessage: "Неверный пароль"})
                    }
                } else {
                    return res.json({resultCode: 1, errorMessage: "Что-то пошло не так"})
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