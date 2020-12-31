import Container from './components/Container';
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
    <Container>
      <p>Hi, {hello}. How are you today? OwO</p>
    </Container>
  </Layout>;
}
