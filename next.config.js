module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'prodbase.com.br', 'images.pexels.com']
  },
  env: {
    TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
  },
  // webpack: (config, options) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
  //     'handlebars': 'handlebars/dist/cjs/handlebars.runtime',
  //   }

  //   return config
  // },
}