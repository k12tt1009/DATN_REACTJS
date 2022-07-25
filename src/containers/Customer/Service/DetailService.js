import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailService.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import StaffSchedule from '../Staff/StaffSchedule';
import StaffExtraInfor from '../Staff/StaffExtraInfor';
import ProfileStaff from '../Staff/ProfileStaff';
import { getAllDetailServiceById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';

class DetailService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrStaffId: [],
            dataDetailService: {},
            listProvince: []
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailServiceById({
                id: id,
                location: 'ALL'
            });

            let resProvince = await getAllCodeService('PROVINCE')

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrStaffId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.staffService;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrStaffId.push(item.staffId)
                        })

                    }
                }

                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueVi: "Toàn quốc"
                    })
                }

                this.setState({
                    dataDetailService: res.data,
                    arrStaffId: arrStaffId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getAllDetailServiceById({
                id: id,
                location: location
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrStaffId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.staffService;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrStaffId.push(item.staffId)
                        })

                    }
                }

                this.setState({
                    dataDetailService: res.data,
                    arrStaffId: [],
                }, () => this.setState({ arrStaffId: arrStaffId }));
            }
        }

    }

    render() {
        let { arrStaffId, dataDetailService, listProvince } = this.state;
        return (
            <div className='detail-service-container'>
                <HomeHeader />
                <div className='detail-service-body'>

                    <div className='description-service'>
                        {dataDetailService && !_.isEmpty(dataDetailService)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailService.descriptionHTML }}>

                            </div>
                        }
                    </div>

                    <div className='search-se-staff'>
                        <select className='search-staff-location' onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (<option key={index} value={item.keyMap}>
                                        {item.valueVi}
                                    </option>)
                                })
                            }
                        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailService);
