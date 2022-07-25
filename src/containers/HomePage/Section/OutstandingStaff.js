import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import { getAllDetailServiceById, getAllCodeService } from '../../../services/userService';
import _ from 'lodash';

class OutstandingStaff extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrStaffs: [],
            listProvince: []
        }
    }

    async componentDidMount() {
        this.props.loadTopStaffs();
        //if (this.props.match && this.props.match.params && this.props.match.params.id) {
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

        //}
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topStaffsRedux !== this.props.topStaffsRedux) {
            this.setState({
                arrStaffs: this.props.topStaffsRedux,

            })
        }
    }

    handleViewDetailStaff = (staff) => {
        if (this.props.history) {
            this.props.history.push(`/detail-staff/${staff.id}`)
        }
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
                    arrStaffId: [],
                }, () => this.setState({ arrStaffId: arrStaffId }));
            }
        }

    }

    render() {
        let { arrStaffs } = this.state;
        //console.log('check listProvince: ', this.state)
        // arrStaffs = arrStaffs.concat(arrStaffs).concat(arrStaffs)
        return (
            <div className='section-share section-outstanding-staff'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className="title-section">Các chuyên viên</span>
                        {/* <div className='search-se-staff'>
                            <select className='search-staff-location' onChange={(event) => this.handleOnChangeSelect(event)}>
                                {listProvince && listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (<option key={index} value={item.keyMap}>
                                            {item.valueVi}
                                        </option>)
                                    })
                                }
                            </select>
                        </div> */}
                        <button className='btn-section-staff'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            {arrStaffs && arrStaffs.length > 0
                                && arrStaffs.map((item, index) => {
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');

                                    }
                                    let positionVi = `${item.positionData.valueVi}`;
                                    let nameVi = `${item.firstName} ${item.lastName}`;
                                    let address = `${item.address}`
                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDetailStaff(item)}>
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-staff'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    />
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{positionVi}</div>
                                                    <div>{nameVi}</div>
                                                    <div><i className="fas fa-map-marker-alt"></i>   {address}</div>
                                                </div>
                                            </div>
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
        topStaffsRedux: state.admin.topStaffs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopStaffs: () => dispatch(actions.fetchTopStaff())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingStaff));
