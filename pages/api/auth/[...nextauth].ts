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
            name: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                try {
                    const {email, password} = credentials as {
                        email: string,
                        password: string,
                    };

                   return await axios.post(`${process.env.REACT_APP_BACK_URI}/api/auth/signup`, {email, password})
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
    secret: process.env.NEXT_AUTH_SECRET,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
}

export default NextAuth(authOptions)