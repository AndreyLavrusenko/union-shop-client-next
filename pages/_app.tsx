import '@/styles/global.scss'
import type {AppProps} from 'next/app'
import {systemAPI} from "@/api/api";
import React from "react";
import Layout from "@/pages/layout";


interface IApp {
    copyright: string
}

export default function App({Component, pageProps, copyright}: AppProps & IApp) {
    return (
        <Layout copyright={copyright}>
            <Component {...pageProps} />
        </Layout>
    )
}

App.getInitialProps = async () => {
    const data = await systemAPI.getCopyright()

    return {copyright: data.copyright}
}