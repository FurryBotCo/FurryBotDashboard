import React from 'react';

export default function Footer() {
  const current = new Date();
  const year = `2018-${current.getFullYear()}`;

  return <div className='px-12 py-12 text-white items-center'>
    <div className='flex flex-wrap -mx-4 overflow-hidden'>
      <p className='text-white'>Copyright &copy; Donovan and August &bull; {year}</p>
    </div>
  </div>;
}
