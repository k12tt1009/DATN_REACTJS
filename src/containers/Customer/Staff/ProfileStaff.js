import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileStaff.scss';
import { getProfileStaffById } from '../../../services/userService';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProfileStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }


    async componentDidMount() {
        let data = await this.getInforStaff(this.props.staffId)
        this.setState({
            dataProfile: data
        })
    }

    getInforStaff = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileStaffById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.staffId !== prevProps.staffId) {
            // this.getInforStaff(this.props.staffId)
        }
    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVi;

            let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')

            return (
                <>
                    <div>{time} - {date}</div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { isShowDescriptionStaff, dataTime,
            isShowLinkDetail, isShowPrice, staffId
        } = this.props
        let { dataProfile } = this.state;
        let positionVi = '', nameVi = '';
        if (dataProfile && dataProfile.positionData) {
            positionVi = `${dataProfile.positionData.valueVi}`;
            nameVi = `${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        console.log('check props form profile: ', dataTime)
        return (
            <div className='profile-staff-container'>
                <div className='intro-staff'>
                    <div
                        className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {positionVi}: {nameVi}
                        </div>
                        <div className='down'>
                            {isShowDescriptionStaff === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown &&
                                        dataProfile.Markdown.description
                                        && <span>
                                            {dataProfile.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                </>
                            }
                        </div>
                    </div>

                </div>

                {isShowLinkDetail === true &&
                    <div className='view-detail-staff'>
                        <Link to={`/detail-staff/${staffId}`}>Xem thêm</Link>
                    </div>
                }
                {isShowPrice === true &&
                    <div className='price'>
                        Giá dịch vụ ước tính:
                        {" " + dataProfile.Staff_Infor?.priceTypeData?.valueVi}
                    </div>
                }
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStaff);
