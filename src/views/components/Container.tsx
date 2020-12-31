import React from 'react';

interface ContainerProperties {
  children?: React.ReactNode;
}

export default function Container({ children }: ContainerProperties) {
  return <div className='container mx-auto sm:px-9 sm:py-3'>{children}</div>;
}
