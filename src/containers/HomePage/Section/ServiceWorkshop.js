import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ServiceWorkshop.scss';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getTopShowroomHomeService } from '../../../services/userService';
import { withRouter } from 'react-router';

class ServiceWorkshop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataShowroom: []
        }
    }

    async componentDidMount() {
        let res = await getTopShowroomHomeService('');
        if (res && res.errCode === 0) {
            this.setState({
                dataShowroom: res.data ? res.data : []
            })
        }
    }

    handleViewDetailShowroom = (showroom) => {
        if (this.props.history) {
            this.props.history.push(`/detail-showroom/${showroom.id}`)
        }
    }

    render() {
        let { dataShowroom } = this.state;
        return (
            <div className='section-share section-service-workshop'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className="title-section">Các xưởng dịch vụ</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataShowroom && dataShowroom.length > 0 &&
                                dataShowroom.map((item, index) => {
                                    return (
                                        <div className='section-customize showroom-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailShowroom(item)}
                                        >
                                            <div className='bg-image section-service-workshop'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='showromm-name'>{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServiceWorkshop));
