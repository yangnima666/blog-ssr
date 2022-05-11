import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from '..';

export default withIronSessionApiRoute(login, ironOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { phone ='', verify=""} = req.body
  console.log(phone)
  console.log(verify)
  return res.status(200).json({
    code: 0,
    msg:0,
    
  });
}