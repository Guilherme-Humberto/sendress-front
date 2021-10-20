import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
  AiOutlineInstagram,
  AiFillGithub,
  AiOutlineLinkedin,
} from 'react-icons/ai';

import { HomeBlockOneWrapper } from './HomeBlockOneStyles';

const HomeBlockOne: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  // const buy = async () => {
  //   // const stripe = await stripeConfigure()
  //   await axios
  //     .post('http://localhost:3333/client/register', {
  //       name: 'Guilherme',
  //       secondname: 'Humberto',
  //       document: '37749903323',
  //       email: 'gbreups4@gmail.com',
  //       password: '12345678',
  //       planMode: 'basic',
  //       status: 'active',
  //       productId: 'prod_KDPiKkyddBoqpp',
  //     })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault()

    axios.post('/api/sendemail', { email })
      .then(() => {
        setMessage('Email enviado com sucesso!!')

        setTimeout(() => {
          setEmail('')
          setMessage('')
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
        setMessage('Erro ao enviar email, tente novamente.')

        setTimeout(() => {
          setEmail('')
          setMessage('')
        }, 2000)
      })
  }
  return (
    <HomeBlockOneWrapper>
      <div>
        <h1>Aumente sua conversão com envio de emails em massa e campanhas de cold-emails</h1>
        <p className="text-intro">
          Diminua o tempo de prospecção e aumente sua taxa de
          conversão com envio de emails personalizados e campanhas de cold-emails.
        </p>
        <form onSubmit={handleContact}>
          <input type="email" required placeholder="Informe seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button>Quero experimentar</button>
        </form>
        {message && <span className="message-text">{message}</span>}
      </div>
    </HomeBlockOneWrapper>
  );
};

export default HomeBlockOne;
