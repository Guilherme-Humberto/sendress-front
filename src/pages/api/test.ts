import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from 'stripe'

const stripeSecretKey = String(process.env.STRIPE_SECRET_KEY)
const stripeClient = new Stripe(stripeSecretKey, {
    apiVersion: '2020-08-27'
})

module.exports = async (req: NextApiRequest & { customerId: string }, res: NextApiResponse) => {

    const user = await stripeClient.customers.retrieve(String('cus_KNENHpaTzMFvbZ'))
    const subscription = await stripeClient.subscriptions.list({
        customer: user.id
    })

    const paymentMethod = await stripeClient.subscriptions.list({
        customer: 'cus_KM4ctMjZxcr7QX'
    });

    return res.send(subscription)
};