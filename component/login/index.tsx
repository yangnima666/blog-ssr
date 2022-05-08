import CountDown from 'component/conutDown';
import type { NextPage } from 'next';
import { useState } from 'react';
import style from './Login.module.scss';
import { message } from 'antd'
import request from 'service/fetch'

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login: NextPage<IProps> = ({ isShow = false, onClose }) => {
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });

  const handleGetverityCode = () => {
    //获取验证码
    if(!form.phone) {
      message.error('请输入手机号')
      return
    }
    request.post('/api/user/sendVerifyCode',{
      to:form?.phone,
      templateId:1
    }).then((res:any)=> {
      if(res?.code === 0){
        setIsShowVerityCode(true)
      }else {
        message.error(res?.msg || '未知错误')
      }
      console.log(res)
        
    })
  };
  const handleLogin = () => {
    //登录按钮
  };
  const handleOtherLogin = () => {
    //其他登录方式
  };
  const handleClose = ()=> {
    //关闭登录框
    onClose()
  }
  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:value
    })
  };
  const [isShowVerityCode, setIsShowVerityCode] = useState(false)//控制验证码倒计时
  const handleCountDownEnd = ()=> {
    //当倒计时结束时的操作
    setIsShowVerityCode(false)
    
  }
  return isShow ? (
    <div className={style.loginArea}>
      <div className={style.loginBox}>
        <div className={style.loginTitle}>
          <div className={style.title}>手机登录</div>
          <div className={style.close} onClick={handleClose}>X</div>
        </div>
        <input
          type="text"
          value={form.phone}
          placeholder="请输入手机号"
          name="phone"
          onChange={handlePhoneChange}
        />
        <div className={style.verityCodeArea}>
          <input
            type="text"
            value={form.verify}
            placeholder="请输入验证码"
            name="verify"
            onChange={handlePhoneChange}
          />
          <span className={style.verityCode} onClick={handleGetverityCode}>
           {isShowVerityCode?<CountDown time={10} onEnd={handleCountDownEnd}/>:'获取验证码'} 
          </span>
        </div>
        <div className={style.loginBtn} onClick={handleLogin}>
          登录
        </div>
        <div className={style.otherLogin} onClick={handleOtherLogin}>
          使用Github登录
        </div>
        <div className={style['agreement-box']}>
          注册登录即表示同意&nbsp;&nbsp;
          <a href="" target="_blank">
            用户协议
          </a>&nbsp;
          、
          <a href="" target="_blank">
            隐私政策
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
