import { format } from 'date-fns';
import md5 from 'md5';
import { encode } from 'js-base64';
import { NextApiRequest, NextApiResponse } from 'next';
import request from 'service/fetch';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from '..';

export default withIronSessionApiRoute(sendVerifyCode, ironOptions);

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const { to = '', templateId = '1' } = req.body;
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000; //随机验证码
  const expireMinute = '5'; //过期时间
  const session: ISession = req.session;
  const AppId = '8a216da8806f31ad01809f0dd39a0964';
  const AccountId = '8a216da8806f31ad01809f0dd276095e';
  const AuthToken = '0257f69809d34b44bb1fc01a537d9026';
  const NowDate = format(new Date(), 'yyyyMMddHHmmss');
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);
  const Authorization = encode(`${AccountId}:${NowDate}`);
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;
  console.log(to);
  console.log(templateId);
  console.log(SigParameter);
  console.log(Authorization);

  const response = await request.post(
    url,
    {
      to,
      AppId,
      templateId,
      datas: [verifyCode, expireMinute],
    },
    {
      headers: {
        Authorization,
      },
    }
  );
  console.log(response);
  const { statusCode, statusMsg } = response as any;

  if(statusCode === "000000") {
    session.verifyCode = verifyCode
    await session.save()
    res.status(200).json({
      code: 0,
      msg:statusMsg,
      data: {
        name:'jack'
      },
    });

  }else {
    res.status(200).json({
      code: statusCode,
      msg:statusMsg,
      
    });
  }
  
}

// export default sendVerifyCode;
