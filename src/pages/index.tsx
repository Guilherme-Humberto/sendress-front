import { GetStaticProps } from 'next';
import React from 'react';
import { Stripe } from 'stripe';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import HomeBlockFour from '../components/Home/HomeBlockFour/HomeBlockFour';
import HomeBlockOne from '../components/Home/HomeBlockOne/HomeBlockOne';
import HomeBlockThree from '../components/Home/HomeBlockThree/HomeBlockThree';
import HomeBlockTwo from '../components/Home/HomeBlockTwo/HomeBlockTwo';
import SeoComponent from '../components/SeoComponent/SeoComponent';

interface Props {
  products: [
    {
      product: Stripe.Response<Stripe.Product>;
      price: Stripe.Price;
    },
  ];
}

const Home: React.FC<Props> = ({ products }: Props) => {
  return (
    <>
      <SeoComponent
        title="SetCampaign | Facilite o email marketing"
        desc=""
        keywords=""
        url="https://setcampaign.com.br/"
      />
      <Header />
      <main>
        <HomeBlockOne />
        <HomeBlockTwo />
        {/* <HomeBlockThree products={products} /> */}
      </main>
      <Footer />
    </>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const stripeSecretKey = String(process.env.STRIPE_SECRET_KEY);
//   const stripeClient = new Stripe(stripeSecretKey, {
//     apiVersion: '2020-08-27',
//   });
//   const getPrices = await stripeClient.prices.list();

//   const getProducts = getPrices.data.map(async price => {
//     const product = await stripeClient.products.retrieve(String(price.product));
//     return { product, price };
//   });

//   const formatResponse = await Promise.all(getProducts);

//   return {
//     props: {
//       products: formatResponse,
//     },
//     revalidate: 10,
//   };
// };

export default Home;
