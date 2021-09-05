// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | { message: string }>
) {
  await sleep1Second();

  if (req.query.country === 'Italy') {
    return res.status(500).json({ message: 'Sorry Italian friends :)' });
  }

  if (req.query.country === 'France') {
    return res
      .status(200)
      .json(['Peugeot', 'Citroen', 'Renault', 'Alpine', 'etc...']);
  }

  if (req.query.country === 'Germany') {
    return res
      .status(200)
      .json(['Mercedes', 'BMW', 'Audi', 'Porsche', 'VW', 'etc...']);
  }
}

function sleep1Second() {
  return new Promise((res) => {
    setTimeout(res, 1000);
  });
}
