import React, { Component } from "react";
import { connect } from "react-redux";
import "./Service.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getTopServiveHomeService } from '../../../services/userService';
import { withRouter } from 'react-router';

class Service extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataService: []
        }
    }

    async componentDidMount() {
        let res = await getTopServiveHomeService('');
        if (res && res.errCode === 0) {
            this.setState({
                dataService: res.data ? res.data : []
            })
        }
    }

    handleViewDetailService = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-service/${item.id}`)
        }
    }

    render() {
        let { dataService } = this.state;
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Các gói dịch vụ</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataService && dataService.length > 0 &&
                                dataService.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize service-child"
                                            key={index}
                                            onClick={() => this.handleViewDetailService(item)}
                                        >
                                            <div
                                                className="bg-image section-specialty"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="service-name">{item.name}</div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Service));
