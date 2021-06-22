import React, { ReactNode } from 'react'
import Head from 'next/head'
// import { GA_KEY } from '@/_env';

// GOOGLE ANALYTICS
// import { init } from './ga';

import Header from '../components/header';
import Footer from '../components/footer';

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => {

    // React.useEffect(() => {
    //     init(GA_KEY);
    // }, []);

    return (
        <div className="site-container">
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="author" content="Guilherme Lautert" />
            </Head>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;
