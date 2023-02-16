import React, {useEffect, useState} from 'react';
import Head from "next/head";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import {systemAPI} from "@/api/api";
import NavbarContainer from "@/components/navbar/NavbarContainer";
import NextNProgress from "nextjs-progressbar";


const Layout = ({children}: React.PropsWithChildren<{}>) => {
    const [copyright, setCopyright] = useState("")

    useEffect(() => {
        const getCopyright = async () => {
            const data = await systemAPI.getCopyright()
            setCopyright(data.copyright)
        }

        getCopyright()
    }, [])

    return (
        <>
            <Head>
                <title>Union Shop</title>
            </Head>
            <div className="wrapper">
                <Header/>
                <div className='container'>
                    <div className="main">
                        <NavbarContainer />
                        {children}
                    </div>
                </div>
                <Footer copyright={copyright}/>
            </div>
        </>
    );
};

export default Layout;

