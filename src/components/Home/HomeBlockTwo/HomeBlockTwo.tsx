import React from 'react';
import Image from 'next/image';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { HiOutlineTemplate } from 'react-icons/hi';
import {
  FiBarChart2,
  FiUsers,
  FiMenu,
  FiTrendingUp,
  FiMessageSquare,
  FiMap,
} from 'react-icons/fi';
import {
  HomeBlockTwoWrapper,
  CardWrapper,
  Card,
  IntroWrapper,
  DashWrapper,
  CardService,
  ServicesWrapper,
  ServicesTopics
} from './HomeBlockTwoStyles';

const HomeBlockTwo: React.FC = () => {
  return (
    <HomeBlockTwoWrapper>
      <p>Chegou a hora de conquistar ainda mais clientes. Automatize o envio das suas campanhas de email marketing e envie emails em massa para o mundo todo!!</p>

      <CardWrapper>
        <Card>
          <div className="icon">
            <FiBarChart2 />
          </div>
          <div>
            <h1>Métricas de sucesso</h1>
            <p>Acompanhe o engajamento de suas campanhas e acelere suas vendas.</p>
          </div>
        </Card>
        <Card>
          <div className="icon">
            <HiOutlineTemplate />
          </div>
          <div>
            <h1>Templates prontos</h1>
            <p>Conte com diversas opções de templates de email prontos para usar em suas campanhas.</p>
          </div>
        </Card>
        <Card>
          <div className="icon">
            <AiOutlineClockCircle />
          </div>
          <div>
            <h1>Automatize</h1>
            <p>Agende seus envios e aproveite o tempo nas estratégias de crescimento do seu negócio.</p>
          </div>
        </Card>
      </CardWrapper>
      <IntroWrapper>
        <div>
          <h1><FiUsers /> Cadastre seus leads</h1>
          <p>Preencha as informações dos seus leads. Cada detalhe poderá ser importante para a criação das suas campanhas de cold e-mails.</p>
        </div>
        <div>
          <h1><FiMenu /> Organize-se</h1>
          <p>Tanto para envio de emails em massa e campanhas de cold-emails. Organizar seus contatos em listas é uma boa forma de se manter organizado.</p>
        </div>
        <div>
          <h1><FiMessageSquare /> Crie suas campanhas</h1>
          <p>Crie e edite suas campanhas do seu jeito ou utilize as diversas opções de template com apenas um clique</p>
        </div>
        <div>
          <h1><FiMap /> Sem fronteiras</h1>
          <p>Não existem para suas campanhas. Envie emails para qualquer lugar do mundo.</p>
        </div>
      </IntroWrapper>
      <DashWrapper>
        <div>
          <h1>Dashboard fácil de interagir</h1>
          <p>Aproveite todos os nossos serviços, gerencie informações pessoais e planos de assinatura facilmente.</p>
        </div>
        <div>
          <Image
            src="/home/dash-image.png"
            layout="fill"
            alt="depoiment image"
            quality={100}
            priority
          />
        </div>
      </DashWrapper>
      <ServicesWrapper>
        <ServicesTopics>
          <div>
            <p>Gostei muito da ferramenta, atende perfeitamente minhas necessidades.</p>

            <div className="perfil">
              <Image
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                height={50}
                width={50}
                alt="depoiment image"
              />
              <strong>Guilherme Humberto</strong>
            </div>
          </div>
          <div>
            <p>Adorei a simplicidade da plataforma e a proposta. Estão realmente de parabéns.</p>

            <div className="perfil">
              <Image
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                height={50}
                width={50}
                alt="depoiment image"
              />
              <strong>Guilherme Humberto</strong>
            </div>
          </div>
          <div>
            <p>Não conhecia a ferramente, fiquei muito satisfeito com o serviço. Meus parabéns.</p>

            <div className="perfil">
              <Image
                src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                height={50}
                width={50}
                alt="depoiment image"
              />
              <strong>Guilherme Humberto</strong>
            </div>
          </div>
        </ServicesTopics>
      </ServicesWrapper>
    </HomeBlockTwoWrapper>
  );
};

export default HomeBlockTwo;
