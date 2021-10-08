import axios from 'axios'
import stream from 'stream';
import { promisify } from 'util';
import { NextApiRequest, NextApiResponse } from "next";

module.exports = async (_req: NextApiRequest, res: NextApiResponse) => {
    const pipeline = promisify(stream.pipeline);
    const file = `${process.env.APP_URL}assets/leads.csv`

    const response = await axios(file);
    if (response.status !== 200) throw new Error(`unexpected response ${response.statusText}`);

    res.setHeader('Content-Type', 'application/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    await pipeline(response.data, res);
    return res.send({ status: true })
};