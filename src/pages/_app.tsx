import 'suneditor/dist/css/suneditor.min.css';
import type {AppProps} from 'next/app';
import {ThemeProvider} from 'styled-components';
import {GlobalStyles} from '../../styles/globalStyles';
import {theme} from '../../themes/primary';
import {AdminProvider} from '../context/adminContext';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AdminProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </AdminProvider>
    </ThemeProvider>
  );
};
export default MyApp;
