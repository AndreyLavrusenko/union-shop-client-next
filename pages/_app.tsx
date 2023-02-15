import '@/styles/global.scss'
import type {AppProps} from 'next/app'
import React from "react";
import Layout from "@/components/Layout";
import {Provider} from "react-redux";
import {persist, store} from "@/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {GoogleOAuthProvider} from '@react-oauth/google';


export default function App({Component, pageProps}: AppProps) {

    return (
        <GoogleOAuthProvider clientId={"826383274395-c9r6kdrv5fkrk0q6kufnrn7i4a604sh6.apps.googleusercontent.com"}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persist}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    )
}