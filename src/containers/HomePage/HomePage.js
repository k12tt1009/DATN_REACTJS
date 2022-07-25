import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Service from './Section/Service';
import ServiceWorkshop from './Section/ServiceWorkshop';
import OutstandingStaff from './Section/OutstandingStaff';
import News from './Section/News';
import About from './Section/About';
import History from './Section/History';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // slickGoTo: this.handleAfterChange
        };

        return (
            <div>
                {/* <History /> */}

                <HomeHeader isshowBanner={true} />

                <Service
                    settings={settings}
                />
                <ServiceWorkshop
                    settings={settings}
                />
                <OutstandingStaff
                    settings={settings}
                />
                <News
                    settings={settings}
                />
                <About />
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
