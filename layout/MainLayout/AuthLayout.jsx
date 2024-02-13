import React, { useEffect } from "react";
import { ToastContainer, Zoom } from 'react-toastify';
import { useRouter, withRouter } from "next/router";
// import { Router, Link } from "../../routes";
import PropTypes from "prop-types";
import Sidebar from './Sidebar';
import Header from './Header';

import { useDispatch, useSelector } from 'react-redux';
import { CallWithAuth, CallWithAuthentication } from "../../actions/apiAction";
import { silentLogin, logout } from "../../store/authReducer/action";


const LoginById = `/users/me`;


const AuthLayout = (props) => {
    const Router = useRouter();
    const dispatch = useDispatch();
    const { user, userRequestLoading, userLoginStatus } = useSelector(state => state.authReducer);


    useEffect(() => {
        console.log("I AM AUTHLAYOUT PAGE")
        if (localStorage.getItem('accessToken')) {
            checkSilentLogin()
        } else {
            dispatch(logout())
            Router.push("/");
        }
    }, [])

    const checkSilentLogin = async () => {
        let userDetails = await CallWithAuthentication("GET", LoginById)
        if (userDetails.data.status === "success") {
            dispatch(silentLogin(userDetails.data.data))
            
        }
    }

    
    return (
        <React.Fragment>
            {/* <Head>
                <title>{APP_NAME}</title>
                <meta name="viewport" content="width=device-width, user-scalable=no"></meta>
            </Head> */}
            <div className="page_wrapper">
                <div className="main_page_sc">
                    {
                        userLoginStatus && localStorage.getItem('accessToken') &&
                        <>
                            <Sidebar notificationCount={props.SendNotificationForCount} />
                            <Header teamHeaderSection={props.teamHeader} userHeaderSection={props.userHeader} />
                        </>
                    }
                    {

                        userLoginStatus && localStorage.getItem('accessToken') ?
                            <>
                                {props.children}
                                
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
                            :
                            <div style={{ position: 'absolute', top: '30%', left: '40%', fontSize: '30px' }}>
                                Loading...
                            </div>
                    }
                </div>
            </div>

        </React.Fragment>
    )
}

const propTypes = {
    /** Children element */
    children: PropTypes.node,
    router: PropTypes.object
};

const defaultProps = {
    disableSidebarHeaderMenu: false,
    teamHeader: { id: '', name: '', value: '', type: '', permission: '' },
    userHeader: { id: '', value: '' },
    notificationCount: 0
};

AuthLayout.propTypes = propTypes;
AuthLayout.defaultProps = defaultProps;

export default withRouter(AuthLayout);