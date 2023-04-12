import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './layout.css';
import Header from '../../components/header/Header';

const Layout = () => {
  return (
    <>
        <Header></Header>

         <main >
          <Outlet/> 
          {/* сюда вставляется все что находится в Layout в App */}
        </main>

        <footer>
         <div className='footer-content'>
              <div className='container'>
                <img src='/image/moviedash.gif' className='footer-logo'></img>
                <div className='footer-icon-wrap'>
                    <div className='footer-icon'><i className="fa-brands fa-vk fa-2xl"></i></div>
                    <div className='footer-icon'><i className="fa-brands fa-youtube fa-2xl"></i></div>
                    <div className='footer-icon'><i className="fa-brands fa-instagram fa-2xl"></i></div>
                    <div className='footer-icon'><i className="fa-brands fa-telegram fa-2xl"></i></div>
                </div>
                <h3 className='footer__bottom-info'>
                  © 2003 — 2023 MovieDash
                </h3>
              </div>
           </div>
        </footer>
     
    </>
  )
}

export default Layout
