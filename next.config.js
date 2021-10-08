module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'prodbase.com.br', 'images.pexels.com']
  },
  env: {
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
  }
}