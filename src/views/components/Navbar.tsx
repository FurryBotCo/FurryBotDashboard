import React from 'react';

function NavbarDropdown() {
  return <div className='overflow-hidden float-left' id='__dropdown'>
    <p>Hello, world!</p>
  </div>;
}

function NavbarDropdownMobile() {
  // responsive dropdown for mobile users
}

function UserDropdown() {
  return null;
}

function LoginMenu() {
  return <a href='https://owo.land' className='block items-center hover:text-blue-400 text-white'>Login</a>;
}

export default function Navbar() {
  let dropped = false;
  return <nav className='flex items-center justify-between flex-wrap p-6 pb-6 bg-gray-800'>
    <div className='flex items-center flex-shrink-0 text-white mr-6'>
      <img
        src='https://i.furry.bot/furry.png'
        style={{ borderRadius: '50%' }}
        className='fill-current h-8 w-8 mr-2'
        alt='Placeholder'
        draggable='false'
      />

      <span className='text-xl text-white tracking-right font-semibold ml-2'>Furry Bot</span>
    </div>

    <div className='block lg:hidden'></div>

    <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
      <a href='/' className='block items-center hover:text-blue-400 text-white ml-4'>
        <span>Home</span>
      </a>

      <a href='/premium' className='block items-center hover:text-blue-400 text-white ml-4'>
        <span>Premium</span>
      </a>

      <a href='https://botapi.furry.bot/invite/support?source=dashboard' className='block items-center hover:text-blue-400 text-white ml-4'>
        <span>Community</span>
      </a>

      <a href='https://furry.bot/add' className='block items-center hover:text-blue-400 text-white ml-4'>
        Invite
      </a>
    </div>

    <div className='w-full block right-auto lg:flex lg:items-center lg:w-auto'>
      {dropped ? <UserDropdown /> : <LoginMenu />}
    </div>
  </nav>;
}
