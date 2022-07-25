import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";


class HomeFooter extends Component {
    state = {
        openWeather: false,
    }

    handleToggleWeather = () => {
        this.setState({ openWeather: !this.state.openWeather });
    }

    render() {

        return (
            <div className="home-footer">
                <p>&copy; 2022 Dịch vụ bảo dưỡng xe Huyndai - Car Maintenance
                    || Đồng hành trên mọi chặng đường</p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
