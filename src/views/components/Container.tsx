import React from 'react';

interface ContainerProperties {
  children?: React.ReactNode;
}

export default function Container({ children }: ContainerProperties) {
  return <div className='container mx-auto px-8 py-10'>{children}</div>;
}
