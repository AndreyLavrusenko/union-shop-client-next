 import React from 'react';
import Head from "next/head";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

 interface IApp {
     copyright: string
 }

const Layout = ({copyright, children}: React.PropsWithChildren<{}> & IApp) => {
    return (
        <>
            <Head>
                <title>Union Shop</title>
            </Head>
            <div className="wrapper">
                <Header/>
                <div className='container'>
                    <div className="main">
                        {/*<NavbarContainer quantityState={quantityState} setQuantityState={setQuantityState}/>*/}
                        {children}
                    </div>
                </div>
                <Footer copyright={copyright}/>
            </div>
        </>
    );
};

export default Layout;

