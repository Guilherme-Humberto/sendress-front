import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from 'stripe'

const stripeSecretKey = String(process.env.STRIPE_SECRET_KEY)
const stripeClient = new Stripe(stripeSecretKey, {
  apiVersion: '2020-08-27'
})

module.exports = async (_req: NextApiRequest, res: NextApiResponse) => {
  const getPrices = await stripeClient.prices.list()

  const getProducts = getPrices.data.map(async price => {
    const product = await stripeClient.products.retrieve(String(price.product))
    return { product, price }
  })

  const formatResponse = await Promise.all(getProducts)

  return res.send(formatResponse)
};