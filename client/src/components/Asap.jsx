// Asap.jsx
import React from 'react';
import './Asap.css';

const Asap = ({image}) => {

  

  return (

    <div className='parent-container-asap h-screen'>
      <div className='img-container-asap'>
        <img  height={"600px"} width={"600px"} src={image} alt="Description" />
      </div>
      <div className='text-container-asap p-4 text-white'>
         Automated attendance portal <br/> with anti-proxy system.
      </div>
    </div>
  );
};

export default Asap;
