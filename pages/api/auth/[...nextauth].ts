import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_LOGIN ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? ''
        }),
        CredentialsProvider({
            type: 'credentials',
            id: 'union-shop',
            name: 'union-shop',
            credentials: {},
            async authorize(credentials, req) {
                try {
                    const {email, password} = credentials as {
                        email: string,
                        password: string,
                    };

                   return await axios.post(`${process.env.NEXT_PUBLIC_BACK_URI}/api/auth/signup`, {email, password})
                        .then((response) => {
                            console.log(response)
                            return response.data;
                        })
                       .catch((error) => {
                           throw new Error(error.response.data.message);
                       }) || null;

                } catch (err) {
                    console.log(err)
                }
            }
        }),
        CredentialsProvider({
            type: 'credentials',
            id: 'unionId',
            name: 'unionId',
            credentials: {},
            async authorize(credentials, req) {
                try {
                    const {email, password} = credentials as {
                        email: string,
                        password: string,
                    };

                    return await axios.post(`${process.env.NEXT_PUBLIC_BACK_URI}/api/auth/unionId`, {email, password})
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            throw new Error(error.response.data.message);
                        }) || null;

                } catch (err) {
                    console.log(err)
                }
            }
        })
    ],
    callbacks: {
        session({ session, token }: any) {
            if (session.user) {
                session.user.id = token.sub as string;
            }
            return session;
        },
    },
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
}

export default NextAuth(authOptions)