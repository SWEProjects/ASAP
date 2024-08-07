import React from 'react';
import Navbar from '../components/Navbar';

const Welcome = () => {
  return (
    <>
      <Navbar />
      <div className='flex flex-row bg-[#F4A261] h-full'>
        <div className='flex-1 flex items-center justify-center'>
          <p>Content for the left side</p>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <p>Content for the right side</p>
        </div>
      </div>
    </>
  );
};

export default Welcome;
