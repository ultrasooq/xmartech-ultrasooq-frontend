import React, { useState } from "react";
import { withRouter } from "next/router";
import SiteLayout from "../../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";

const Page = () => {
  const Router = useRouter();
  return (
    <SiteLayout>
      <Head>
        <title>Details</title>
      </Head>
      Details
      <button onClick={() => Router.push("/home")}>Goto Home</button>
    </SiteLayout>
  );
};

export default withRouter(Page);
