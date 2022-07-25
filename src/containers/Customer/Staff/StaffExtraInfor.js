import React, { Component } from 'react';
import { connect } from "react-redux";
import './StaffExtraInfor.scss';
import { getExtraInforStaffById } from '../../../services/userService';
// import NumberFormat from 'react-number-format';

class StaffExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }


    async componentDidMount() {
        if (this.props.staffIdFromParent) {
            let res = await getExtraInforStaffById(this.props.staffIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.staffIdFromParent !== prevProps.staffIdFromParent) {
            let res = await getExtraInforStaffById(this.props.staffIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        console.log('check state: ', this.state)
        return (
            <div className='staff-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>Địa chỉ xưởng làm việc:</div>
                    <div className='name-showroom'>
                        {extraInfor && extraInfor.nameShowroom ? extraInfor.nameShowroom : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressShowroom ? extraInfor.addressShowroom : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            <div className='title-short-infor'>
                                Giá dịch vụ ước tính:
                            </div>
                            <div className='price-detail'>
                                {extraInfor && extraInfor.priceTypeData ? extraInfor.priceTypeData.valueVi + '  VND' : ''}
                            </div>
                            <span onClick={() => this.showHideDetailInfor(true)}>
                                Xem thêm
                            </span>
                        </div>
                    }


                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price-more'>Chi phí phụ đi kèm: </div>
                            <div className='detail-infor'>
                                <div className='detail-up'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                                <div className='detail-down'>
                                    Chi phí phụ và vệ sinh: 300.000 VNĐ - 500.000 VNĐ
                                </div>
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>
                                    Ẩn
                                </span>
                            </div>
                        </>
                    }

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StaffExtraInfor);
