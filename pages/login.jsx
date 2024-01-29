import React, { useState } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import ToastHot from 'react-hot-toast';

const Login = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Login</title>
      </Head>


      Login
      <img src="../images/favicon.ico" />
      <button onClick={()=> Router.push("/home")} className='button-sub'>Goto Home</button>
      <button onClick={()=> Router.push("/details/page")} className='button-sub'>Goto Page</button>
    </SiteLayout>
  )
}




export default withRouter(Login);