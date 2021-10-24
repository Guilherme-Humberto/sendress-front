/* eslint-disable react/no-unknown-property */

import React, { useState, useContext } from 'react';
import {
  FiHome,
  FiUsers,
  FiClock,
  FiSettings,
  FiMessageSquare,
} from 'react-icons/fi';
import {
  HiOutlineDocumentText,
  HiOutlineMailOpen,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from 'react-icons/hi';
import { BsBook, BsListNested } from 'react-icons/bs';

import { MenuLeftWrapper, LinkMenu } from './MenuLeftStyles';
import { AdminContext } from '../../../../context/adminContext';

const MenuLeft: React.FC = () => {
  const { route, setRoute } = useContext(AdminContext);
  const [changeMenu, setChangeMenu] = useState(false);

  const changeRoutes = (route: string) => setRoute(route);

  return (
    <MenuLeftWrapper changeMenu={changeMenu}>
      <div className="logo-wrapper">
        {changeMenu ? (
          <div className="logo-wrapper-admin">
            <div className="circle">
              <h1>Set</h1>
            </div>
          </div>
        ) : (
          <div className="logo-wrapper-admin">
            <div className="circle">
              <h1>Set</h1>
            </div>
            <h1>Campaign</h1>
          </div>
        )}
      </div>
      <nav className="geral-navs">
        <h3 className="sec-title">Geral</h3>
        <LinkMenu
          showLink={changeMenu}
          active={route === 'painel'}
          onClick={() => changeRoutes('painel')}>
          <FiHome />
          <p className="link-title">Painel</p>
          <div className="link-intro-wrapper">
            Tenha uma visão geral das suas atividades.
          </div>
        </LinkMenu>
        <LinkMenu
          showLink={changeMenu}
          active={route === 'contacts'}
          onClick={() => changeRoutes('contacts')}>
          <FiUsers />
          <p className="link-title">Contatos</p>
          <div className="link-intro-wrapper">
            Gerencie contatos cadastrados.
          </div>
        </LinkMenu>
        <LinkMenu
          showLink={changeMenu}
          active={route === 'segments'}
          onClick={() => changeRoutes('segments')}>
          <BsListNested />
          <p className="link-title">Listas</p>
          <div className="link-intro-wrapper">
            Organize seus contatos.
          </div>
        </LinkMenu>
        <LinkMenu
          showLink={changeMenu}
          active={route === 'campaigns'}
          onClick={() => changeRoutes('campaigns')}>
          <FiMessageSquare />
          <p className="link-title">Campanhas</p>
          <div className="link-intro-wrapper">
            Gerencie suas campanhas de email.
          </div>
        </LinkMenu>
        <LinkMenu
          showLink={changeMenu}
          active={route === 'senders'}
          onClick={() => changeRoutes('senders')}>
          <HiOutlineMailOpen />
          <p className="link-title">Remetentes</p>
          <div className="link-intro-wrapper">
            Gerencie todos os seus remetentes.
          </div>
        </LinkMenu>
        <h3 className="sec-title">Automação</h3>
        <LinkMenu
          showLink={changeMenu}
          active={route === 'schedule'}
          onClick={() => changeRoutes('schedule')}>
          <FiClock />
          <p className="link-title">Programar envios</p>
          <div className="link-intro-wrapper">Automatize seus envios.</div>
        </LinkMenu>
        <h3 className="sec-title">Sistema</h3>
        <LinkMenu
          showLink={changeMenu}
          active={route === 'blog'}
          onClick={() => changeRoutes('blog')}>
          <BsBook />
          <p className="link-title">Conteúdos</p>
          <div className="link-intro-wrapper">
            Dicas sobre email marketing
          </div>
        </LinkMenu>
        <LinkMenu
          showLink={changeMenu}
          active={route === 'docs'}
          onClick={() => changeRoutes('docs')}>
          <HiOutlineDocumentText />
          <p className="link-title">Documentação</p>
          <div className="link-intro-wrapper">
            Aprenda mais sobre o SendWay.
          </div>
        </LinkMenu>
      </nav>

      <button
        className="change-menu-btn"
        onClick={() => setChangeMenu(state => !state)}>
        {changeMenu ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft />}
      </button>
    </MenuLeftWrapper>
  );
};

export default MenuLeft;
