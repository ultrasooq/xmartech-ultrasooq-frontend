import React, { useState, useEffect } from "react";
import { ToastContainer, Zoom } from 'react-toastify';
import { useRouter, withRouter } from "next/router";
// import { APP_NAME } from '../../env';
import Head from 'next/head';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from 'react-redux';

import { CallWithAuth, CallWithAuthentication } from "../../actions/apiAction";
import { silentLogin, logout } from "../../store/authReducer/action";
import Header from "./Header";
import Sidebar from "./Sidebar";

const LoginById = `/users/me`;

const SiteLayout = (props) => {
    const Router = useRouter();
    const [validAccess, setValidAccess] = useState(false)

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authReducer);
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {

            //Added by prasanta
            checkSilentLogin()
            console.log(props.router.asPath)
            if (props.router.asPath !== "/") {
                Router.push(`${props.router.asPath}`)
            } else {
                Router.push("/dashboard");
            }
        } else {
            setValidAccess(true)
        }
    }, [])

    //Added by prasanta
    const checkSilentLogin = async () => {
        let userDetails = await CallWithAuthentication("GET", LoginById)
        console.log(userDetails)
        if (userDetails.data.status === "success") {
            dispatch(silentLogin(userDetails.data.data))
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title>Puremoon</title>

            </Head>
            {
                <>
                    <main className="overflow-x-hidden">
                        {
                            <>
                                <Sidebar />
                                <Header />
                            </>
                        }
                        {props.children}
                    </main>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={3000}
                        hideProgressBar
                        transition={Zoom}
                        closeOnClick
                        rtl={false}
                        toastClassName="px-3 txt-16--body text-white"
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover={false}
                    />
                </>
            }

        </React.Fragment>
    )
}

const propTypes = {
    /** Children element */
    children: PropTypes.node,
};

const defaultProps = {
};

SiteLayout.propTypes = propTypes;
SiteLayout.defaultProps = defaultProps;

export default withRouter(SiteLayout);