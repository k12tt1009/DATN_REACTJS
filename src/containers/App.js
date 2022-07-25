import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import { path } from '../utils'
import Home from '../routes/Home';
import Login from './Auth/Login';
import LoginCustomer from './Auth/LoginCustomer';
import System from '../routes/System';
import { CustomToastCloseButton } from '../components/CustomToast';
import HomePage from './HomePage/HomePage.js';
import CustomScrollbars from '../components/CustomScrollbars';
import DetailStaff from './Customer/Staff/DetailStaff';
import Staff from '../routes/Staff';
import VerifyEmail from './Customer/VerifyEmail';
import DetailNews from './Customer/News/DetailNews';
import DetailService from './Customer/Service/DetailService';
import DetailShowroom from './Customer/Showroom/DetailShowroom';
import DetailSearch from './HomePage/DetailSearch';
import Price from './HomePage/HeaderMenu/Price';
import Register from './Auth/Register';
import CustomerBooking from './Customer/Booking/CustomerBooking';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">

                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGIN} exact component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.LOGIN_CUSTOMER} exact component={userIsNotAuthenticated(LoginCustomer)} />
                                    <Route path={path.REGISTER} component={Register} />
                                    <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                    <Route path={'/staff/'} component={userIsAuthenticated(Staff)} />

                                    <Route path={path.HOMEPAGE} component={HomePage} />
                                    <Route path={path.DETAIL_STAFF} component={DetailStaff} />
                                    <Route path={path.DETAIL_SERVICE} component={DetailService} />
                                    <Route path={path.DETAIL_SHOWROOM} component={DetailShowroom} />
                                    <Route path={path.DETAIL_NEWS} component={DetailNews} />
                                    <Route path={path.DETAIL_SEARCH} component={DetailSearch} />

                                    <Route path={path.VERIFT_EMAIL_BOOKING} component={VerifyEmail} />

                                    <Route path={path.PRICE} exact component={(Price)} />

                                    <Route path={path.CUSTOMER_BOOKING} exact component={(CustomerBooking)} />

                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
                            className="toast-container" toastClassName="toast-item" bodyClassName="toast-item-body"
                            autoClose={false} hideProgressBar={true} pauseOnHover={false}
                            pauseOnFocusLoss={true} closeOnClick={false} draggable={false}
                            closeButton={<CustomToastCloseButton />}
                        /> */}

                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />

                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        isLoggedCustomer: state.customer.isLoggedCustomer
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);