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
            <button onClick={() => Router.push("/login")}>Goto Login</button>
            <button onClick={() => Router.push("/details/page")}>Goto Page</button>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
        </SiteLayout>
    )

}


export default withRouter(Home);