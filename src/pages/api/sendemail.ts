import { NextApiRequest, NextApiResponse } from "next";
import Telegram from "node-telegram-bot-api";

const token = String(process.env.TELEGRAM_TOKEN);
const chatId = String(process.env.TELEGRAM_CHAT_ID);

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email } = req.body;
    const bot = new Telegram(token);

    bot.sendMessage(chatId, `Novo usuário: ${email}`)
        .then(() => res.send({ status: true }))
        .catch((err) => res.send({ status: false, err }))
};