import React, {FormEvent, useState} from 'react';
import {PlanProps} from '../../interfaces/IPlan';
import {formatUnitAmount} from '../convertAmount';
import {ModalRegisterWrapper} from './ModalRegisterStyles';
import {RiCloseLine} from 'react-icons/ri';
import Input from '../Input/Input';
import {getAPIClient} from '../../../services/api';

interface Props {
  plan: PlanProps;
  active(value: boolean): void;
}

const ModalRegister: React.FC<Props> = ({plan, active}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleRegisterUser = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const planMode = plan.metadata.type === 'premium' ? 'PREMIUM' : 'BASIC';

      getAPIClient()
        .post(
          '/user/register',
          {
            name,
            email,
            document,
            password,
            planMode,
            transactionId: '',
            accessToken: '',
          },
          {
            headers: {
              product: plan.product,
            },
          },
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalRegisterWrapper
      variants={variants}
      initial="hidden"
      animate="visible">
      <RiCloseLine className="close-icon" onClick={() => active(false)} />
      <div className="title-modal">
        <h2>{plan.name}</h2>
        <h1>{formatUnitAmount(plan.unit_amount)}</h1>
      </div>
      <p>{plan.description}</p>

      <form onSubmit={handleRegisterUser}>
        <Input
          label="Nome"
          placeholder="Informe seu nome"
          value={name}
          setState={setName}
          mask=""
          error=""
        />
        <Input
          label="E-mail"
          placeholder="Informe seu e-mail"
          value={email}
          setState={setEmail}
          mask=""
          error=""
        />
        <Input
          label="CPF"
          placeholder="Informe seu CPF"
          value={document}
          setState={setDocument}
          mask="999.999.999.99"
          error=""
        />
        <Input
          label="Senha"
          placeholder="Informe sua senha"
          value={password}
          setState={setPassword}
          mask=""
          error=""
        />
        <Input
          label="Confirme a senha"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          setState={setConfirmPassword}
          mask=""
          error=""
        />
        <button type="submit">Confirmar</button>
      </form>
    </ModalRegisterWrapper>
  );
};

export default ModalRegister;
