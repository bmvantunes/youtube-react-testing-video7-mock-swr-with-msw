import type { AppProps } from 'next/app';
import { MySwrConfig } from '../components/MySwrConfig';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MySwrConfig>
      <Component {...pageProps} />
    </MySwrConfig>
  );
}
