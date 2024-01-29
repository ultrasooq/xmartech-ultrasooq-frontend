import React, { useEffect, useState } from 'react';
import AuthLayout from '../layout/MainLayout/AuthLayout';
import { withRouter } from 'next/router';
import Head from 'next/head';


const Dashboard = (props) => {
   return (
      <AuthLayout >
         <Head>
            <title>Dashboard</title>
         </Head>
         Dashboard

      </AuthLayout>
   )
}

Dashboard.getInitialProps = async (ctx) => {
   console.log("Dashboard: getInitialProps", ctx)
   let ApiResponse = { name: "dashboard page" }
   return { ApiResponse }
}

export default withRouter(Dashboard);

