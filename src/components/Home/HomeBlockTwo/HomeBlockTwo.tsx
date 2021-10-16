import React from 'react';
import Image from 'next/image';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {HiOutlineTemplate} from 'react-icons/hi';
import {FiBarChart2} from 'react-icons/fi';
import {
  HomeBlockTwoWrapper,
  CardWrapper,
  Card,
  IntroWrapper,
  DashWrapper,
  CardService,
} from './HomeBlockTwoStyles';

const HomeBlockTwo: React.FC = () => {
  return (
    <HomeBlockTwoWrapper>
      <h1>Aumente suas vendas</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, natus
        doloribus? Laudantium quo vero nam!
      </p>

      <CardWrapper>
        <Card>
          <div className="icon">
            <FiBarChart2 />
          </div>
          <div>
            <h1>Lorem ipsum dolor sit.</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div>
        </Card>
        <Card>
          <div className="icon">
            <HiOutlineTemplate />
          </div>
          <div>
            <h1>Lorem ipsum dolor sit.</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div>
        </Card>
        <Card>
          <div className="icon">
            <AiOutlineClockCircle />
          </div>
          <div>
            <h1>Lorem ipsum dolor sit.</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div>
        </Card>
      </CardWrapper>
      <IntroWrapper>
        <div>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis in
            quas, consectetur illum id numquam corporis officia tempore
            accusantium ea?
          </h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
            autem.
          </h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </IntroWrapper>
      <DashWrapper>
        <CardService>
          <div>
            <h2>Cadastre seus leads</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, iure aut? At, aliquam debitis?
            </p>
          </div>
          <Image
            src="/home/img-lead.png"
            width={700}
            height={700}
            quality={100}
            alt="lead"
          />
        </CardService>
        <CardService>
          <Image
            src="/home/img-list.png"
            width={500}
            height={500}
            quality={100}
            alt="lead"
          />
          <div>
            <h2>Organize-se</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, iure aut? At, aliquam debitis?
            </p>
          </div>
        </CardService>
        <CardService>
          <div>
            <h2>Crie suas campanhas</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatum, iure aut? At, aliquam debitis?
            </p>
          </div>
          <Image
            src="/home/img-campaign.png"
            width={700}
            height={700}
            alt="lead"
          />
        </CardService>
      </DashWrapper>
    </HomeBlockTwoWrapper>
  );
};

export default HomeBlockTwo;
