import Document, { NextScript, Head, Html, Main, DocumentContext } from 'next/document';

export default class FurryDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const props = await Document.getInitialProps(ctx);

    // TODO: check if user exists and pass it down?
    return props;
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='icon' type='image/png' sizes='192x192' href='https://i.furry.bot/android-icon-192x192.png' />
          <link rel='apple-touch-icon' sizes='180x180' href='https://i.furry.bot/apple-icon-180x180.png' />
          <link rel='apple-touch-icon' sizes='152x152' href='https://i.furry.bot/apple-icon-152x152.png' />
          <link rel='apple-touch-icon' sizes='144x144' href='https://i.furry.bot/apple-icon-144x144.png' />
          <link rel='apple-touch-icon' sizes='120x120' href='https://i.furry.bot/apple-icon-120x120.png' />
          <link rel='apple-touch-icon' sizes='114x114' href='https://i.furry.bot/apple-icon-114x114.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='https://i.furry.bot/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='https://i.furry.bot/favicon-96x96.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='https://i.furry.bot/favicon-16x16.png' />
          <link rel='apple-touch-icon' sizes='76x76' href='https://i.furry.bot/apple-icon-76x76.png' />
          <link rel='apple-touch-icon' sizes='72x72' href='https://i.furry.bot/apple-icon-72x72.png' />
          <link rel='apple-touch-icon' sizes='60x60' href='https://i.furry.bot/apple-icon-60x60.png' />

          <meta name='viewpoint' content='width=device-width, initial-scale=1' />
          <meta name='theme-color' content='#63B2A3' />
          <meta charSet='utf-8' />
        </Head>

        <body className='bg-primary'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
