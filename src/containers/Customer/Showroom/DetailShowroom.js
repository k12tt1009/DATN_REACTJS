import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailShowroom.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import StaffSchedule from '../Staff/StaffSchedule';
import StaffExtraInfor from '../Staff/StaffExtraInfor';
import ProfileStaff from '../Staff/ProfileStaff';
import { getAllDetailShowroomById, getAllCodeShowroom } from '../../../services/userService';
import _ from 'lodash';

class DetailShowroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrStaffId: [],
            dataDetailShowroom: {}
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailShowroomById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrStaffId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.staffShowroom;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrStaffId.push(item.staffId)
                        })

                    }
                }

                this.setState({
                    dataDetailShowroom: res.data,
                    arrStaffId: arrStaffId,
                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    // handleOnChangeSelect = async (event) => {
    //     if (this.props.match && this.props.match.params && this.props.match.params.id) {
    //         let id = this.props.match.params.id;
    //         let location = event.target.value;

    //         let res = await getAllDetailServiceById({
    //             id: id,
    //             location: location
    //         });

    //         if (res && res.errCode === 0) {
    //             let data = res.data;
    //             let arrStaffId = []
    //             if (data && !_.isEmpty(res.data)) {
    //                 let arr = data.staffService;
    //                 if (arr && arr.length > 0) {
    //                     arr.map(item => {
    //                         arrStaffId.push(item.staffId)
    //                     })

    //                 }
    //             }

    //             this.setState({
    //                 dataDetailService: res.data,
    //                 arrStaffId: arrStaffId,
    //             })
    //         }
    //     }

    // }

    render() {
        let { arrStaffId, dataDetailShowroom } = this.state;

        console.log('check state from detail service: ', this.state)

        return (
            <div className='detail-service-container'>
                <HomeHeader />
                <div className='detail-service-body'>

                    <div className='description-service'>
                        {dataDetailShowroom && !_.isEmpty(dataDetailShowroom)
                            &&
                            <>
                                <div className='showroom-name'>{dataDetailShowroom.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailShowroom.descriptionHTML }}>

                                </div>

                            </>
                        }
                    </div>


                    {arrStaffId && arrStaffId.length > 0 &&

                        arrStaffId.map((item, index) => {
                            return (
                                <div className='each-staff' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-staff'>
                                            <ProfileStaff
                                                staffId={item}
                                                isShowDescriptionStaff={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            //dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='staff-schedule'>
                                            <StaffSchedule
                                                staffIdFromParent={item}
                                            />
                                        </div>

                                        <div className='staff-extra-infor'>
                                            <StaffExtraInfor
                                                staffIdFromParent={item}
                                            />
                                        </div>

                                    </div>
                                </div>
                            )
                        })

                    }
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailShowroom);
