import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from 'config/index';
import { ISession } from '..';
import { prepareConnection } from 'db/index';
import { User, UserAuth } from 'db/entity';

export default withIronSessionApiRoute(login, ironOptions);

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { phone = '', verify = '', identifier_type = 'phone' } = req.body;
  const db = await prepareConnection();
  const userRepo = db.getRepository(User); //连接数据库表
  const userAuthRepo = db.getRepository(UserAuth); //连接数据库表
  const session: ISession = req.session;
  const users = await userRepo.find(); //查找数据，会转换成sql语句

  if (String(session.verifyCode) === String(verify)) {
    //验证码正确

    const userAuth = await userAuthRepo.findOne(
      {
        identifier: 'phone',
        identifier_type,
      },
      {
        relations: ['user'],
      }
    );

    if (userAuth) {
      //已存在
      const user = userAuth.user;
      const { id, nickname, avatar } = user;
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;

      await session.save();

      res.status(200).json({
        code: 0,
        msg: '登录成功',
        data:{
          userId:id,
          nickname,
          avatar
        }
      });
    } else {
      //新建用户
      const user = new User();
      user.nickname = `用户_${Math.floor(Math.random() * 10000)}`;
      user.avatar = '/image/default.jpeg';
      user.job = '暂无';
      user.introduce = '暂无';

      const userAuths = new UserAuth();

      userAuths.identifier = phone;
      userAuths.identifier_type = identifier_type;
      userAuths.credential = session.verifyCode;
      userAuths.user = user;

      const resUserAuth = await userAuthRepo.save(userAuths);
      const {
        user: { id, nickname, avatar },
      } = resUserAuth;
      //保存到session
      session.userId = id;
      session.nickname = nickname;
      session.avatar = avatar;
      await session.save();

      res.status(200).json({
        code: 0,
        msg: '登录成功',
        data:{
          userId:id,
          nickname,
          avatar
        }
      });

      console.log(666);
      console.log(resUserAuth);
    }
  }else {
    res.status(200).json({
      code: -1,
      msg: '验证码错误',
    });
  }

  
}
