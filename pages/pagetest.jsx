import React, { Component } from 'react'
import { withRouter } from 'next/router';
import SiteLayout from "../layout/MainLayout/SiteLayout";
import { toast } from "react-toastify";
import Head from 'next/head';
import _ from "lodash";
import { useRouter } from "next/router";
import { SP } from 'next/dist/shared/lib/utils';

const Pagetest = () => {
    const Router = useRouter();
    return (
        <SiteLayout>
            <Head>
                <title>Home Page</title>
            </Head>
        Page test
        </SiteLayout>
    )

}


export default withRouter(Pagetest);