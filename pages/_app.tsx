import '@/styles/global.scss'
import type {AppProps} from 'next/app'
import React, {useEffect, useState} from "react";
import Layout from "@/components/Layout";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {SessionProvider} from "next-auth/react";


export default function App({Component, pageProps}: AppProps) {
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);

    if (isSSR) return null;

    return (
        <SessionProvider>
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </SessionProvider>
    )
}