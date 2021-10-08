import React, {useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {loadStripe} from '@stripe/stripe-js';
import {ConfirmWrapper} from './ConfirmStyles';

const stripeConfig = String(process.env.STRIPE_PUBLIC_KEY);

const Confirm: React.FC = () => {
  const router = useRouter();

  const handleCheckout = async () => {
    const stripe = await loadStripe(stripeConfig);
    return await stripe?.redirectToCheckout({
      sessionId: String(router.query.sessionId),
    });
  };

  return (
    <ConfirmWrapper>
      <div>
        <svg
          width="104"
          height="88"
          viewBox="0 0 104 63"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M78.6822 6.62416L72.3751 0L44.0155 29.7852L50.3226 36.4094L78.6822 6.62416ZM97.6482 0L50.3226 49.7047L31.6249 30.1141L25.3179 36.7383L50.3226 63L104 6.62416L97.6482 0ZM0 36.7383L25.0047 63L31.3118 56.3758L6.35183 30.1141L0 36.7383Z"
            fill="#645BDE"
          />
        </svg>
        <h1>Email confirmado com sucesso :)</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam facilis
          dolorum odio expedita provident tempore unde.
        </p>
        <button onClick={handleCheckout}>Seguir para próxima etapa</button>
      </div>
    </ConfirmWrapper>
  );
};

export default Confirm;
