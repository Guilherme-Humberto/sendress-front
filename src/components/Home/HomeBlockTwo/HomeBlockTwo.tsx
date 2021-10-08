import React from 'react';
import Image from 'next/image';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {HiOutlineMailOpen, HiOutlineTemplate} from 'react-icons/hi';
import {
  HomeBlockTwoWrapper,
  WrapperOne,
  WrapperTwo,
  Card,
  ImageWrapper,
} from './HomeBlockTwoStyles';

const HomeBlockTwo: React.FC = () => {
  return (
    <HomeBlockTwoWrapper>
      <WrapperOne>
        <Card>
          <div>
            <h1>
              <AiOutlineClockCircle />
              Aumente sua produtividade
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim eum
              id amet blanditiis, quia atque.
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <h1>
              <HiOutlineMailOpen />
              Aumente sua conversão
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim eum
              id amet blanditiis, quia atque.
            </p>
          </div>
        </Card>
        <Card>
          <div>
            <h1>
              <HiOutlineTemplate />
              Opções de templates
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim eum
              id amet blanditiis, quia atque.
            </p>
          </div>
        </Card>
      </WrapperOne>
      <WrapperTwo>
        <div>
          <ImageWrapper>
            <Image
              src="/home/ilustration-lead.png"
              alt="ilustration-lead"
              layout="fill"
              priority
              objectFit="contain"
            />
          </ImageWrapper>
        </div>
        <div>
          <h1>Cadastre seus leads</h1>
          <p>
            Entre com o as informações de seus leads. Cada detalhe poderá ser
            importante para a criação de seus templates de cold e-mails.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
            quaerat voluptatibus iste adipisci culpa impedit veritatis? Est,
            esse. Nulla blanditiis accusamus nesciunt facilis fugiat
            consequatur, quam similique repellendus non ipsum?
          </p>
        </div>
      </WrapperTwo>
      <WrapperTwo>
        <div>
          <h1>Organize seus envios</h1>
          <p>
            Entre com o as informações de seus leads. Cada detalhe poderá ser
            importante para a criação de seus templates de cold e-mails.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
            quaerat voluptatibus iste adipisci culpa impedit veritatis? Est,
            esse. Nulla blanditiis accusamus nesciunt facilis fugiat
            consequatur, quam similique repellendus non ipsum?
          </p>
        </div>
        <div>
          <ImageWrapper>
            <Image
              src="/home/ilustration-list.png"
              alt="ilustration-lead"
              layout="fill"
              priority
              objectFit="contain"
            />
          </ImageWrapper>
        </div>
      </WrapperTwo>
      <WrapperTwo>
        <div>
          <ImageWrapper>
            <Image
              src="/home/ilustration-camp.png"
              alt="ilustration-lead"
              layout="fill"
              priority
              objectFit="cover"
            />
          </ImageWrapper>
        </div>
        <div>
          <h1>Cadastre suas campanhas</h1>
          <p>
            Entre com o as informações de seus leads. Cada detalhe poderá ser
            importante para a criação de seus templates de cold e-mails.
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti
            quaerat voluptatibus iste adipisci culpa impedit veritatis? Est,
            esse. Nulla blanditiis accusamus nesciunt facilis fugiat
            consequatur, quam similique repellendus non ipsum?
          </p>
        </div>
      </WrapperTwo>
    </HomeBlockTwoWrapper>
  );
};

export default HomeBlockTwo;
