import {Stripe} from 'stripe';

const stripeSecretKey = String(process.env.STRIPE_SECRET_KEY);
export const stripeClient = new Stripe(stripeSecretKey, {
  apiVersion: '2020-08-27',
});