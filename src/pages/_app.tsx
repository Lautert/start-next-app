import React from 'react';
import App from 'next/app';
import { storeWrapper } from "../redux/store";

import '@/styles/globals.scss';

import SiteLayout from '../layout/container';
import { ToastContainer } from 'react-toastify';
import LockScreen from '@/components/LockScreen';

class DefaultApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss={true}
                    draggable={false}
                    pauseOnHover={true}
                    closeButton={({ closeToast }) => (
                        <i className="moon icon-close" onClick={closeToast}></i>
                    )}
                />
                <SiteLayout>
                    <Component {...pageProps} />
                </SiteLayout>
                <LockScreen />
            </>
        )
    }
}
export default storeWrapper.withRedux(DefaultApp);
