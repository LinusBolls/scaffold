import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ ok: true });
}

export default handler;
