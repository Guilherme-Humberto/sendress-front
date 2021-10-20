import React, { useEffect, useState } from 'react';
import { Stripe } from 'stripe';
import axios from 'axios';
import {
  HomeBlockThreeWrapper,
  PaymentsList,
  Card,
} from './HomeBlockThreeStyles';
import ModalRegister from '../../Helpers/ModalRegister/ModalRegister';
import ModalLogin from '../../Helpers/ModalLogin/ModalLogin';
import { PlanProps } from '../../interfaces/IPlan';
import { formatUnitAmount } from '../../Helpers/convertAmount';

interface Props {
  products: [
    {
      product: Stripe.Response<Stripe.Product>;
      price: Stripe.Price;
    },
  ];
}

const HomeBlockThree: React.FC<Props> = ({ products }: Props) => {
  const [planData, setPlanData] = useState<PlanProps>({} as PlanProps);
  const [activeModalLogin, setActiveModalLogin] = useState<boolean>(false);
  const [activeModalRegister, setActiveModalRegister] =
    useState<boolean>(false);

  const chooseAPlan = ({ ...props }: PlanProps) => {
    if (props.metadata.type === 'premium') {
      setPlanData(props);
      setActiveModalRegister(true);
    } else {
      setPlanData(props);
      setActiveModalLogin(true);
    }
  };

  return (
    <>
      <HomeBlockThreeWrapper>
        <div className="intro">
          <h1>Nossos planos</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga,
            sequi?
          </p>
        </div>
        <PaymentsList>
          {products.map(({ product, price }) => (
            <div key={product.id}>
              <Card
                noColor={product.metadata.type === 'premium' ? false : true}>
                <div className="price">
                  <h1 className="product-name">{product.name}</h1>
                  <h1 className="product-price">
                    {formatUnitAmount(Number(price.unit_amount))}
                  </h1>
                </div>
                <p className="description">{product.description}</p>
                <ul>
                  <li>{product.metadata.lists}</li>
                  <li>{product.metadata.contacts}</li>
                  <li>{product.metadata.templates}</li>
                  <li>{product.metadata.campanhas}</li>
                </ul>
                <button
                  onClick={() => {
                    chooseAPlan({
                      ...product,
                      ...price,
                      description: String(product.description),
                      unit_amount: Number(price.unit_amount),
                      unit_amount_decimal: String(price.unit_amount_decimal),
                      metadata: { ...product.metadata },
                    });
                  }}>
                  Quero conferir
                </button>
              </Card>
            </div>
          ))}
        </PaymentsList>
      </HomeBlockThreeWrapper>

      {activeModalRegister && (
        <ModalRegister
          plan={planData as PlanProps}
          active={setActiveModalRegister}
        />
      )}
      {activeModalRegister && (
        <ModalRegister
          plan={planData as PlanProps}
          active={setActiveModalLogin}
        />
      )}
    </>
  );
};

export default HomeBlockThree;
