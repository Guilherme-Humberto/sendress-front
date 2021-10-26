import 'suneditor/dist/css/suneditor.min.css';

import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../styles/globalStyles';
import { theme } from '../../themes/primary';
import { AdminProvider } from '../context/adminContext';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    router.events.on('routeChangeStart', () => setIsLoading(true))
    router.events.on('routeChangeComplete', () => setIsLoading(false))
    router.events.on('routeChangeError', () => setIsLoading(false))
  }, [router])

  return (
    <ThemeProvider theme={theme}>
      <AdminProvider>
        <GlobalStyles />
        {!isLoading ? <Component {...pageProps} /> : (
          <div className="is-loading-wrapper">
            <AiOutlineLoading3Quarters />
            <h2>Estamos preparando tudo para você...</h2>
          </div>
        )}
      </AdminProvider>
    </ThemeProvider>
  );
};
export default MyApp;
