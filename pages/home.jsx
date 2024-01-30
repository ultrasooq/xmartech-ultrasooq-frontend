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

            <div className="section home_sec1">
                <div className="container">
                    <div className='row'>
                        <div className="col-lg-6">
                            <div className="home_sec1_box home_sec1_box_big">
                                <img src="images/hs-1.png"/>
                                <div className="home_sec1_box_overlay">
                                    <div className="home_sec1_box_content">
                                        <h6>samsung</h6>
                                        <h3>sed do eiusmod tempor incididunt</h3>
                                        <p>Only 2 days:</p>
                                        <h5>21/10 & 22/10</h5>
                                        <a href='#'> Shop Now </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="home_sec1_box home_sec1_box_small">
                                <img src="images/hs-2.png"/>
                                <div className="home_sec1_box_overlay">
                                    <div className="home_sec1_box_content">
                                        <h3><b>Fluence</b> Minimal Speaker</h3>
                                        <p>Just Price</p>
                                        <h5>$159.99</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="home_sec1_box home_sec1_box_small">
                                <img src="images/hs-3.png"/>
                                <div className="home_sec1_box_overlay">
                                    <div className="home_sec1_box_content">
                                        <h6>camera</h6>
                                        <h3><b>Camera</b> Sale <span>20% OFF</span></h3>
                                        <p>Just Price</p>
                                        <h5>$159.99</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div>Home page</div>
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
            </div> */}
        </SiteLayout>
    )

}


export default withRouter(Home);