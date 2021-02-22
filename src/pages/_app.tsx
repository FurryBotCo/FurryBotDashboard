import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Head from 'next/head';

import '../styles/style.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      {/* its here so if there is no `Head` element, it'll populate with this >w> */}
      <title>🐾 Furry Bot 🐾</title>
    </Head>

    <Navbar />
    <Component {...pageProps} />
  </>;
}
