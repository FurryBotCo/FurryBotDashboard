import Layout from './components/Layout';
import React from 'react';

export default function Homepage({ hello }: { hello: string }) {
  return <Layout
    title='Home'
    embed={{
      title: 'Furry Bot',
      description: 'A fun multi-purpose bot for (furry) Discord servers!',
      path: '/'
    }}
  >
    Hi, {hello}. How are you?
  </Layout>;
}
