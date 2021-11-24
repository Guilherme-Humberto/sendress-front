import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from 'stripe'

const stripeSecretKey = String(process.env.STRIPE_SECRET_KEY)
const stripeClient = new Stripe(stripeSecretKey, {
    apiVersion: '2020-08-27'
})

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {

    const billing = await stripeClient.billingPortal.sessions.create({
        customer: req.headers.customerid,
        return_url: 'https://stripe.com/docs/billing/subscriptions/customer-portal'
    })

    console.log(billing)

    return res.redirect(billing?.url)
};
