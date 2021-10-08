import React, {useContext, useState, useEffect} from 'react';
import * as Yup from 'yup';
import {useRouter} from 'next/router';
import {destroyCookie} from 'nookies';
import {BiUserCircle, BiLoaderAlt} from 'react-icons/bi';
import {BsBookmarkCheck} from 'react-icons/bs';
import {RiNotificationLine} from 'react-icons/ri';
import {FiLogOut} from 'react-icons/fi';
import {AdminContext} from '../../../context/adminContext';
import Input from '../Helpers/Input/Input';
import {UserWrapper, MenuUserTab, TabTitle, MenuUserCenter} from './UserStyles';
import {formatUnitAmount} from '../../Helpers/convertAmount';
import {userEditValidation} from '../validations/user';
import {getAPIClient} from '../../../services/api';
import ModalAlert from '../Helpers/Modals/ModalAlert/ModalAlert';

interface Error {
  name: string;
  email: string;
}

const User: React.FC = () => {
  const router = useRouter();

  const {user, token, subscription, product, payment} =
    useContext(AdminContext);

  const [tabActive, setTabActive] = useState('informations');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error>({} as Error);
  const [alertPopup, setAlertPopup] = useState(false);
  const [alertBody, setAlertBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeTab = (tab: string) => setTabActive(tab);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
      };

      await userEditValidation.validate(data, {
        abortEarly: false,
      });

      const api = getAPIClient();

      api
        .put('/user/update', data, {
          headers: {
            userid: user.id,
            customerid: user.customerId,
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setAlertBody('Dados atualizados com sucesso');
          setAlertPopup(true);

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        })
        .catch(() => {
          setAlertBody(
            'Erro ao atualizar seus dados, tente novamente mais tarde.',
          );
          setAlertPopup(true);

          setTimeout(() => {
            setAlertPopup(false);
          }, 2000);
        });
    } catch (err) {
      let errors: any = [];
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError) => {
          errors = [error.path, error.message];
        });
      }

      setError({
        name: errors[0] === 'name' ? errors[1] : '',
        email: errors[0] === 'email' ? errors[1] : '',
      });
    }
  };

  const handleManageAccount = async () => {
    const api = getAPIClient();

    await api
      .post('/user/billing_session', null, {
        headers: {
          userid: user.id,
          customerid: user.customerId,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/html',
        },
      })
      .then(({data}) => {
        setAlertBody('Abrindo portal de faturamento');
        setIsLoading(true);

        setTimeout(() => {
          router.push(data.portalSessionUrl);
        }, 2000);
      })
      .catch(err => console.log(err));
  };

  const handleLogout = () => {
    setAlertBody('Encerrando sessão');
    setIsLoading(true);

    setTimeout(() => {
      localStorage.clear();
      destroyCookie(null, 'sendway.token');
      router.push('/');
      setIsLoading(false);
    }, 2000);
  };

  if (!subscription || !payment) return <h1>Carregando...</h1>;

  return (
    <>
      <UserWrapper>
        <MenuUserTab>
          <TabTitle
            onClick={() => handleChangeTab('informations')}
            tabActive={tabActive === 'informations' ? true : false}>
            <BiUserCircle /> Dados pessoais
          </TabTitle>
          <TabTitle
            onClick={() => handleChangeTab('notifications')}
            tabActive={tabActive === 'notifications' ? true : false}>
            <RiNotificationLine /> Notificações
          </TabTitle>
          <TabTitle
            onClick={() => handleChangeTab('subscription')}
            tabActive={tabActive === 'subscription' ? true : false}>
            <BsBookmarkCheck /> Meu plano
          </TabTitle>
          <TabTitle onClick={handleLogout}>
            <FiLogOut /> Sair
          </TabTitle>
        </MenuUserTab>
        <MenuUserCenter>
          {tabActive === 'informations' && (
            <div className="infos-wrapper">
              <h1 className="user-name">Olá {user.name}</h1>
              <p>Seja bem vindo ao seu perfil de usuário</p>

              <form onSubmit={handleUpdateUser}>
                <Input
                  label="Usuário"
                  placeholder="Seu E-mail"
                  value={name ? name : user.name}
                  setState={setName}
                  mask=""
                  error=""
                />
                <Input
                  label="Seu E-mail"
                  placeholder="Seu E-mail"
                  value={email ? email : user.email}
                  setState={setEmail}
                  mask=""
                  error=""
                />
                <Input
                  label="CPF"
                  placeholder="Seu E-mail"
                  value={user.document}
                  setState={() => {}}
                  mask=""
                  error=""
                  disabled
                />
                <div className="flex">
                  <Input
                    label="Endereço"
                    placeholder="Seu E-mail"
                    value={'Rua xxx - 4'}
                    setState={() => {}}
                    mask=""
                    error=""
                  />
                  <Input
                    label="Cep"
                    placeholder="Seu E-mail"
                    value={'04923140'}
                    setState={() => {}}
                    mask=""
                    error=""
                  />
                </div>
                <button>Salvar alterações</button>
              </form>
            </div>
          )}
          {tabActive === 'notifications' && (
            <div className="alerts-wrapper">
              <h1>{user.name}</h1>
            </div>
          )}
          {tabActive === 'subscription' &&
            (!product || !subscription ? (
              <h1>Carregando...</h1>
            ) : (
              <div className="subs-wrapper">
                <h1 className="product-name">{product.name}</h1>
                <p className="product-desc">{product.description}</p>
                {subscription.cancel_at_period_end === true ? (
                  <>
                    <p className="cancel-subscription-title">
                      Sua assinatura será cancelada, mas continuará disponível
                      até o fim do período de faturamento, em:{' '}
                      {new Date(
                        subscription.cancel_at * 1000,
                      ).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="product-period-start">
                      Data da compra:{' '}
                      {new Date(
                        subscription.current_period_start * 1000,
                      ).toLocaleDateString()}
                    </h1>
                    <h1 className="product-period-end">
                      Próxima fatura:{' '}
                      {new Date(
                        subscription.current_period_end * 1000,
                      ).toLocaleDateString()}
                    </h1>
                  </>
                )}
                <h2 className="product-price">
                  {formatUnitAmount(subscription.plan.amount)}
                </h2>
                <div className="plan-actions">
                  <span onClick={handleManageAccount}>
                    Gerenciar minha assinatura
                  </span>
                </div>
              </div>
            ))}
        </MenuUserCenter>
      </UserWrapper>
      {alertPopup && (
        <ModalAlert>
          <h3>{alertBody}</h3>
        </ModalAlert>
      )}
      {isLoading && (
        <ModalAlert>
          <h3 style={{display: 'flex', alignItems: 'center'}}>
            {alertBody}
            <BiLoaderAlt
              style={{marginLeft: '1rem'}}
              className="loading-icon"
            />
          </h3>
        </ModalAlert>
      )}
    </>
  );
};

export default User;
