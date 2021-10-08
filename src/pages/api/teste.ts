import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from 'stripe'

const stripeSecretKey = String(process.env.STRIPE_SECRET_KEY)
const stripeClient = new Stripe(stripeSecretKey, {
    apiVersion: '2020-08-27'
})

module.exports = async (req: NextApiRequest & { customerId: string }, res: NextApiResponse) => {

    // const user = await stripeClient.customers.retrieve(String('cus_KKfGsbnN2c1buy'))
    // const subscription = await stripeClient.subscriptions.list({
    //     customer: user.id
    // })

    const subscription = await stripeClient.billingPortal.sessions.create({
        customer: 'cus_KM4ctMjZxcr7QX',
        return_url: 'https://stripe.com/docs/billing/subscriptions/customer-portal'
    })

    console.log(subscription)

    const paymentMethod = await stripeClient.paymentMethods.retrieve(
        'pm_1Jh2FUKo6xOtmYTyKeCmx72X'
    );

    return res.send({ subscription })
};