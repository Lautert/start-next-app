import React from 'react';
import Head from 'next/head';

interface PropsHome {
}

interface StateHome {
}

class Home extends React.Component<PropsHome, StateHome>{
    render() {
        return (
            <div>
                <Head>
                    <title>Company Title</title>
                    <meta name="description" content="" />
                    <meta name="keywords" content="" />
                </Head>
                <div className="section home">
                </div>
            </div>
        );
    }
}

export default Home;
