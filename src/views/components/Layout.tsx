import Navbar from './Navbar';
import Footer from './Footer';
import React from 'react';

interface LayoutProperties {
  children?: React.ReactNode;
  location?: string;
  title?: string;
  embed?: LayoutEmbed;
}

interface LayoutEmbed {
  description: string;
  image?: string;
  title: string;
  path: string;
}

function EmbedPreview({ embed }: { embed: LayoutEmbed }) {
  return <>
    <meta property='og:description' content={embed.description} />
    <meta property='og:title' content={embed.title} />
    <meta property='og:url' content={`https://furry.bot${embed.path}`} />
    {embed.image !== undefined ? <meta property='og:image' content={embed.image} /> : null}
  </>;
}

export default function Layout({ children, title, embed }: LayoutProperties) {
  return <html lang='en'>
    <head>
      <title>Furry Bot{title ? ` - ${title}` : ''}</title>
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='description' content='A fun multi-purpose bot for (furry) Discord servers!' />
      <link rel='stylesheet' href='/static/css/style.css' />
      <link rel='shortcut icon' href='https://cdn.floofy.dev/images/August.png' />
      <link rel='icon' href='https://cdn.floofy.dev/images/August.png' />
      <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Nunito&family=Yellowtail&display=swap' />
      <meta charSet='UTF-8' />
      {embed ? <EmbedPreview {...{ embed }} /> : null}

      <script defer src='/static/js/dropdown.js' />
      <script defer src='/static/js/themes.js' />
    </head>
    <body className='bg-gray-700'>
      <Navbar />
      <div className='py-3' />
      {children}
      <Footer />
    </body>
  </html>;
}
