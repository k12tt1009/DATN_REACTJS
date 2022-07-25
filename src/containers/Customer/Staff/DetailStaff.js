import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailStaff.scss';
import { getDetailInforStaff } from '../../../services/userService';
import StaffSchedule from './StaffSchedule';
import StaffExtraInfor from './StaffExtraInfor';
// import LikeAndShare from '../SocialPlugin/LikeAndShare';
// import Comment from '../SocialPlugin/Comment';
import Rating from '../Rating/Rating';

class DetailStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailStaff: {},
            currentStaffId: -1,
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentStaffId: id
            })
            let res = await getDetailInforStaff(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailStaff: res.data
                })
            }

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { detailStaff } = this.state;
        let positionVi = '', nameVi = '';
        if (detailStaff && detailStaff.positionData) {
            positionVi = `${detailStaff.positionData.valueVi}`;
            nameVi = `${detailStaff.firstName} ${detailStaff.lastName}`;
        }

        const { customerInfo } = this.props;

        return (
            <>
                <HomeHeader
                    isshowBanner={false}
                />
                <div className='staff-detail-container'>
                    <div className='intro-staff'>
                        <div
                            className='content-left'
                            style={{ backgroundImage: `url(${detailStaff && detailStaff.image ? detailStaff.image : ''})` }}>

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {positionVi}: {nameVi}
                            </div>
                            <div className='down'>
                                {detailStaff && detailStaff.Markdown && detailStaff.Markdown.description
                                    && <span>
                                        {detailStaff.Markdown.description}
                                    </span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-staff'>
                        <div className='content-left'>
                            <StaffSchedule
                                staffIdFromParent={this.state.currentStaffId}
                            />
                        </div>
                        <div className='content-right'>
                            <StaffExtraInfor
                                staffIdFromParent={this.state.currentStaffId}
                            />
                        </div>
                    </div>
                    <div className='detail-infor-staff'>
                        {detailStaff && detailStaff.Markdown && detailStaff.Markdown.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: detailStaff.Markdown.contentHTML }}>

                            </div>
                        }
                    </div>
                    <div className='comment-staff'>
                        {/* <Rating /> */}
                    </div>
                </div>
                <div className='footer-dt'>
                    <HomeFooter />
                </div>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        isLoggedCustomer: state.customer.isLoggedCustomer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailStaff);
