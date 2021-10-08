import React, {useState, useContext} from 'react';
import {FiSearch, FiUser} from 'react-icons/fi';
import {RiNotificationLine, RiCloseFill} from 'react-icons/ri';
import {AdminContext} from '../../../context/adminContext';
import {HeaderWrapper, ModalUserSettignsWrapper} from './HeaderStyles';

const HeaderAdmin: React.FC = () => {
  const [activeSearch, setActiveSearch] = useState<boolean>(false);

  const {setRoute, user} = useContext(AdminContext);

  return (
    <HeaderWrapper>
      <div>
        <h3 className="user-name">Olá {user.name}</h3>
        <p className="user-email">{user.email}</p>
      </div>
      <div>
        {activeSearch && (
          <form className="form-search">
            <FiSearch />
            <input
              type="text"
              placeholder="Buscar contato, lista, campanha..."
            />
            <RiCloseFill onClick={() => setActiveSearch(state => !state)} />
          </form>
        )}
        {!activeSearch && (
          <FiSearch onClick={() => setActiveSearch(state => !state)} />
        )}
        <RiNotificationLine />
        <FiUser onClick={() => setRoute('user')} />
      </div>
    </HeaderWrapper>
  );
};

export default HeaderAdmin;
