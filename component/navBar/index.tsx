import type { NextPage } from 'next'
import style from './NavBar.module.scss'
import { navs } from './config'
import Link from 'next/link'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import Login from 'component/login'
import { useState } from 'react'

const NavBar:NextPage = ()=> {
  const { pathname } = useRouter()
  const [isShowLogin, setIsShowLogin] = useState(false)//控制登录框显示
  const handleClose = ()=> {
    setIsShowLogin(false)
  }
  const handleLogin = ()=> {
    //登录
    setIsShowLogin(true)
  }
  const handleEditorPage = ()=>{
    //写文章
  }
  return (
    <div className={style.navbar}>
      <section className={style.logo}>Blog</section>
      <nav className={style["main-nav"]}>
        <section className={style.link}>
        {
          navs?.map(nav=>(
            <Link key={nav?.label} href={nav?.value}>
              <a href="" className={pathname === nav?.value?style.active:''}>{nav?.label}</a>
            </Link>
          ))
        }
      </section>
      <section className={style.operationArea}>
        <Button type='primary' onClick={handleLogin}>登录</Button>
        <Button type='primary' onClick={handleEditorPage}>写文章</Button>
      </section>
      <Login isShow={isShowLogin} onClose={handleClose}/>
      </nav>
      
    </div>
  )
}

export default NavBar