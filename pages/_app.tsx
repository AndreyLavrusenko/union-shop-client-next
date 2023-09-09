import '@/styles/global.scss'
import type {AppProps} from 'next/app'
import React, {useEffect, useState} from "react";
import Layout from "@/components/Layout";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {SessionProvider} from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';
import Preloader from "@/common/Preloader";
import {appWithTranslation} from "next-i18next";


function App({Component, pageProps}: AppProps) {
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);

    if (isSSR) return <Preloader />

    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
                <NextNProgress color="#F9B8A2" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </SessionProvider>
    )
}

export default appWithTranslation(App)