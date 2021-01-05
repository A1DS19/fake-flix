import '../css/navbar.css';
import React, { useEffect, useState } from 'react';

function Navbar() {
  const [show, handleShow] = useState(false);

  //Escucha al scroll y decide si mostar navbar y al final quita
  //listener
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
      return () => {
        window.removeEventListener('scroll');
      };
    });
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img
        className='nav__logo'
        src='https://fontmeme.com/permalink/201104/9458189e7a2ce7d6aa7f56ea4cc1bd98.png'
        alt='FAKEFLIX LOGO'
      />

      <img
        className='nav__avatar'
        src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png'
        alt='USER AVATAR'
      />
    </div>
  );
}

export default Navbar;
