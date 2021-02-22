export default function Navbar() {
  return <div className='items-center justify-between flex bg-opacity-90 px-12 py-4 my-4 mx-auto'>
    <div className='inline-flex items-center'>
      <img
        src='https://i.furry.bot/furry.png'
        className='w-16 mr-4 rounded-lg'
        draggable='false'
      />

      <ul className='flex text-white'>
        <li className='px-2 py-1 text-fira'>Home</li>
        <li className='px-2 py-1 text-fira'>Invite</li>
        <li className='px-2 py-1 text-fira'>Commands</li>
      </ul>
    </div>
  </div>;
}
