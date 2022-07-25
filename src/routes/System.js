import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageStaff from '../containers/System/Admin/ManageStaff';
import ManageService from '../containers/System/Services/ManageService';
import ManageNews from '../containers/System/News/ManageNews';
import ManageShowroom from '../containers/System/Showroom/ManageShowroom';
import Welcome from '../containers/System/Welcome';
import ManageBooking from '../containers/System/Booking/ManageBooking';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/welcome" component={Welcome} />

                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-staff" component={ManageStaff} />
                            <Route path="/system/manage-service-pack" component={ManageService} />
                            <Route path="/system/manage-news" component={ManageNews} />
                            <Route path="/system/manage-showroom" component={ManageShowroom} />
                            <Route path="/system/manage-booking" component={ManageBooking} />

                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
