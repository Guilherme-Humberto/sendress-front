import React, {useState, useContext} from 'react';
import {useRouter} from 'next/router';
import * as Yup from 'yup';
import {ModalLoginWrapper} from './ModalLoginStyles';
import {RiCloseLine} from 'react-icons/ri';
import Input from '../Input/Input';
import {loginValidation, forgotPasswordValidation} from '../validations';
import {AdminContext} from '../../../context/adminContext';
import {getAPIClient} from '../../../services/api';

interface Props {
  active(value: boolean): void;
  withLogin: string;
}

interface Error {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  equalPasswords?: string;
}

interface GetSubscriptionProps {
  user: {
    id: number;
    customerId: string;
  };
  token: string;
}

const ModalLogin: React.FC<Props> = ({active, withLogin}) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  const [error, setError] = useState<Error>({} as Error);
  const {signIn} = useContext(AdminContext);

  const duration = 0.7;

  const variants = {
    visible: {
      x: 0,
      transition: {
        ease: 'easeInOut',
        duration,
      },
    },
    hidden: {
      x: '100%',
      transition: {
        ease: 'easeInOut',
        duration,
      },
    },
  };

  const getSubscription = async ({user, token}: GetSubscriptionProps) => {
    const {data: subscriptionResponse} = await getAPIClient().get(
      '/user/get_subscription',
      {
        headers: {
          userid: Number(user.id),
          customerid: user.customerId,
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return subscriptionResponse;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
      };

      await loginValidation.validate(data, {
        abortEarly: false,
      });

      await signIn({email, password})
        .then(async res => {
          const {user, token} = res as unknown as {
            user: object | any;
            token: string;
          };

          const subscriptionResponse = await getSubscription({user, token});

          localStorage.setItem('sendway.token', token);
          localStorage.setItem('sendway.user', JSON.stringify(user));
          localStorage.setItem(
            'sendway.subscription',
            JSON.stringify(subscriptionResponse),
          );
        })
        .catch(err => console.log(err));
    } catch (err) {
      let errors: any = [];
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError) => {
          errors = [error.path, error.message];
        });
      }

      setError({
        email: errors[0] === 'email' ? errors[1] : '',
        password: errors[0] === 'password' ? errors[1] : '',
      });
    }
  };

  const activeForgotPassword = () => {
    setPassword('');
    setEmail('');
    setPasswordConfirm('');
    forgotPassword ? setForgotPassword(false) : setForgotPassword(true);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
        passwordConfirm,
      };

      if (password !== passwordConfirm) {
        setError({equalPasswords: 'As senhas não correspondem'});
        return null;
      }

      await forgotPasswordValidation.validate(data, {
        abortEarly: false,
      });

      const api = getAPIClient();

      api
        .post('/user/forgot_password', data)
        .then(res => {
          const {user} = res.data;

          setEmail(user.email);
          setForgotPassword(false);
        })
        .catch(err => console.log(err));
    } catch (err) {
      let errors: any = [];
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error: Yup.ValidationError) => {
          errors = [error.path, error.message];
        });
      }

      setError({
        email: errors[0] === 'email' ? errors[1] : '',
        password: errors[0] === 'password' ? errors[1] : '',
        passwordConfirm: errors[0] === 'passwordConfirm' ? errors[1] : '',
      });
    }
  };

  return (
    <ModalLoginWrapper variants={variants} initial="hidden" animate="visible">
      <RiCloseLine className="close-icon" onClick={() => active(false)} />
      <h1>{!forgotPassword ? 'Acessar conta' : 'Esqueci minha senha'}</h1>
      {!forgotPassword ? (
        <p>
          {withLogin === 'true'
            ? 'Boa!!! Agora que já criou sua conta na prodMail, basta acessar sua nova conta e aproveitar todos os recursos :)'
            : 'Que bom ter vc de volta, preencha os campos abaixo para acessar sua conta'}
        </p>
      ) : (
        <p>Recupere sua senha de acesso</p>
      )}
      {!forgotPassword ? (
        <form onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            placeholder="Informe seu e-mail"
            value={email}
            setState={setEmail}
            mask=""
            error={error.email || ''}
          />
          <Input
            label="Senha"
            placeholder="Informe sua senha"
            value={password}
            setState={setPassword}
            mask=""
            type="password"
            error={error.password || ''}
          />
          <p className="login-btn-link" onClick={activeForgotPassword}>
            Esqueci minha senha
          </p>
          <button type="submit">Acessar minha conta</button>
        </form>
      ) : (
        <form onSubmit={handleUpdatePassword}>
          <Input
            label="E-mail"
            placeholder="Informe seu e-mail"
            value={email}
            setState={setEmail}
            mask=""
            error={error.email || ''}
          />
          <Input
            label="Nova senha"
            placeholder="Informe sua senha"
            value={password}
            setState={setPassword}
            mask=""
            type="password"
            error={error.password || ''}
          />
          <Input
            label="Confirme a senha"
            placeholder="Informe sua senha"
            value={passwordConfirm}
            setState={setPasswordConfirm}
            mask=""
            type="password"
            error={error.passwordConfirm || ''}
          />
          {error.equalPasswords && <span>{error.equalPasswords}</span>}
          <p className="login-btn-link" onClick={activeForgotPassword}>
            Voltar para login
          </p>
          <button type="submit">Recuperar senha</button>
        </form>
      )}
    </ModalLoginWrapper>
  );
};

export default ModalLogin;
