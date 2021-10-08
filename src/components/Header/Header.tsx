import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {HeaderWrapper} from './HeaderStyles';
import ModalLogin from '../Helpers/ModalLogin/ModalLogin';

const Header: React.FC = () => {
  const router = useRouter();
  const withLogin = router.query.withLogin;

  const [activeModalLogin, setActiveModalLogin] = useState(false);

  useEffect(() => {
    if (withLogin) setActiveModalLogin(true);
  }, [withLogin]);

  return (
    <>
      <HeaderWrapper>
        <nav>
          <Link href="/">
            <a href="">
              <h2>Sendway</h2>
            </a>
          </Link>
          <div className="links-list">
            <Link href="/">
              <a href="">Sobre a piperbase</a>
            </Link>
            <Link href="/">
              <a href="">Nossos preços</a>
            </Link>
            <Link href="/">
              <a href="">Serviços</a>
            </Link>
          </div>
        </nav>
        <div>
          <button onClick={() => setActiveModalLogin(true)}>Acessar</button>
          <button>Criar conta</button>
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
