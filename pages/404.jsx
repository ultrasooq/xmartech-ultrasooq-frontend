import React, { useEffect, useState } from "react";
import Head from "next/head";
import { withRouter } from 'next/router';
import { Router } from "../routes";
import { useDispatch, useSelector } from 'react-redux';
import AuthLayout from "../layout/MainLayout/AuthLayout";
import SiteLayout from "../layout/MainLayout/SiteLayout";

const Custom404 = (props) => {
  const { user } = useSelector(state => state.authReducer);

  return (
    user && localStorage.getItem('accessToken') ?
      <AuthLayout>
        404
      </AuthLayout>
      :
      <SiteLayout>
        404
      </SiteLayout>
  );

}

export default withRouter(Custom404);
