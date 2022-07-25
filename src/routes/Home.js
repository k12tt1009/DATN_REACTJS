import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn, isLoggedCustomer } = this.props;
        let linkToRedirect = '/home';
        if (isLoggedIn) linkToRedirect = '/system/welcome';
        else if (isLoggedCustomer) linkToRedirect = '/home';

        return (
            <Redirect
                to={linkToRedirect}
            />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        isLoggedCustomer: state.customer.isLoggedCustomer
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
