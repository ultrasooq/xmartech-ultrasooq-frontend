import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";

const Home = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>Home Page</title>
            </Head>
            <div>Home page</div>
            {/* <button onClick={() => Router.push("/login")}>Goto Login</button>
            <button onClick={() => Router.push("/details/page")}>Goto Page</button> */}
        </SiteLayout>
    )

}


export default withRouter(Home);