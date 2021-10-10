import React, {useState, useContext, useEffect} from 'react';
import {FiSearch, FiUser} from 'react-icons/fi';
import {RiNotificationLine, RiCloseFill} from 'react-icons/ri';
import {AdminContext} from '../../../context/adminContext';
import {HeaderWrapper} from './HeaderStyles';

const HeaderAdmin: React.FC = () => {
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [userMessage, setUserMessage] = useState('');

  const {setRoute, user} = useContext(AdminContext);

  useEffect(() => {
    const currentDate = Date.now();
    const currentHour = new Date(currentDate).getHours();

    if (currentHour >= 5 && currentHour <= 12) {
      return setUserMessage('Bom dia');
    } else if (currentHour >= 12 && currentHour <= 18) {
      return setUserMessage('Boa tarde');
    } else {
      return setUserMessage('Boa noite');
    }
  }, []);

  return (
    <HeaderWrapper>
      <div>
        <h3 className="user-name">
          {userMessage} {String(user.name).split(' ')[0]}
        </h3>
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
