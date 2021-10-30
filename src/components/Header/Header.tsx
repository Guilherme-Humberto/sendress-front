import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiInstagram } from 'react-icons/fi'
import { HeaderWrapper } from './HeaderStyles';
import ModalLogin from '../Helpers/ModalLogin/ModalLogin';

const Header: React.FC = () => {
  const router = useRouter();
  const withLogin = router.query.withLogin;

  const [activeModalLogin, setActiveModalLogin] = useState(false);

  useEffect(() => {
    if (withLogin) setActiveModalLogin(true);
  }, [withLogin]);

  const elementRef = useRef<HTMLHeadElement>(null);
  const [top, setTop] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (router.pathname === "/") {
      const handleChangeHeaderOnScroll = () => {
        setTop(window.pageYOffset);
        setState(elementRef.current.offsetTop);
      }
      window.addEventListener("scroll", handleChangeHeaderOnScroll);

      return () => window.removeEventListener('scroll', handleChangeHeaderOnScroll)
    }
  }, [top]);

  return (
    <>
      <HeaderWrapper ref={elementRef} changeColor={top > state ? true : false}>
        <nav>
          <Link href="/">
            <a className="logo-wrapper">
              <h1>Sendress</h1>
            </a>
          </Link>
          <div className="links-list">
            {/* <Link href="/">
              <a href="">Sobre a piperbase</a>
            </Link> */}
            {/* <Link href="#services">
              <a href="">Nossos preços</a>
            </Link> */}
            <Link href="#services">
              <a href="">Nossos Serviços</a>
            </Link>
          </div>
        </nav>
        <div>
          <Link href="https://www.instagram.com/sendress.app/">
            <a target="_blank"><FiInstagram size={25} color={"#fff"} /></a>
          </Link>
          <button onClick={() => setActiveModalLogin(true)}>Acessar minha conta</button>
          {/* <button>Criar conta</button> */}
        </div>
      </HeaderWrapper>
      {activeModalLogin && (
        <ModalLogin
          active={setActiveModalLogin}
          withLogin={String(withLogin)}
        />
      )}
    </>
  );
};

export default Header;
