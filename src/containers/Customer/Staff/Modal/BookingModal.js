import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileStaff from '../ProfileStaff';
import { isEmpty } from 'lodash';
import { postCustomerBookAppointment } from '../../../../services/userService';
import { toast } from "react-toastify";
import _ from 'lodash';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            address: '',
            licensePlates: '',
            typeCar: '',
            note: '',
            staffId: '',
            timeType: '',
            day: '',
            isShowLoading: false
        }
    }


    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !isEmpty(this.props.dataTime)) {
                let staffId = this.props.dataTime.staffId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    staffId: staffId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVi;

            let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')

            return `${time} - ${date}`

        }
        return ''
    }

    buildStaffName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = `${dataTime.staffData.firstName} ${dataTime.staffData.lastName}`

            return name;

        }
        return ''
    }

    handleConfirmBooking = async () => {
        //validate input
        //!data.email || !data.staffId || !data.timeType || !data.date
        this.setState({
            isShowLoading: true
        })
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let staffName = this.buildStaffName(this.props.dataTime);
        let { customerInfo } = this.props;

        let res = await postCustomerBookAppointment({
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            phoneNumber: this.state.phoneNumber,
            email: customerInfo.email,
            address: this.state.address,
            licensePlates: this.state.licensePlates,
            typeCar: this.state.typeCar,
            note: this.state.note,
            staffId: this.state.staffId,
            timeType: this.state.timeType,
            date: this.props.date,
            timeString: timeString,
            staffName: staffName
        })
        this.setState({
            isShowLoading: false
        })
        if (res && res.errCode === 0) {
            toast.success('Đặt lịch bảo dưỡng thành công. Vui lòng kiểm tra email để xác nhận lịch hẹn!')
            this.props.closeBookingModal();
        } else {
            toast.error('Đặt lịch bảo dưỡng không thành công. Vui lòng chọn khung giờ khác!')
            this.props.closeBookingModal();
        }

    }

    render() {

        let { isOpenModal, closeBookingModal, dataTime, customerInfo, isLoggedCustomer } = this.props;
        console.log('check data time: ', dataTime)
        let staffId = '';
        if (dataTime && !isEmpty(dataTime)) {
            staffId = dataTime.staffId
        }

        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Đang xử lý...'
            >
                {isLoggedCustomer === true &&
                    <Modal
                        isOpen={isOpenModal}
                        className={'booking-modal-container'}
                        size="lg"
                        centered
                    // backdrop={true}
                    >
                        <div className='booking-modal-content'>
                            <div className='booking-modal-header'>
                                <span className='left'>Thông tin đặt lịch bảo dưỡng xe</span>
                                <span
                                    className='right'
                                    onClick={closeBookingModal}
                                >
                                    <i className="fas fa-times"></i>
                                </span>
                            </div>
                            <div className='booking-modal-body'>
                                <div className='staff-infor'>
                                    <ProfileStaff
                                        staffId={staffId}
                                        isShowDescriptionStaff={false}
                                        dataTime={dataTime}
                                        isShowLinkDetail={false}
                                        isShowPrice={true}
                                    />
                                </div>
                                <div className='row'>
                                    <div className='col-4 form-group'>
                                        <label>Họ</label>
                                        <input className='form-control'
                                            value={customerInfo.firstName}
                                        //onChange={(event) => this.handleOnchangeInput(event, 'firstName')}
                                        />
                                    </div>
                                    <div className='col-4 form-group'>
                                        <label>Tên</label>
                                        <input className='form-control'
                                            value={customerInfo.lastName}
                                        //onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                        />
                                    </div>
                                    <div className='col-4 form-group'>
                                        <label>Email</label>
                                        <input className='form-control'
                                            value={customerInfo.email}
                                            onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Số điện thoại</label>
                                        <input className='form-control'
                                            value={this.state.phoneNumber}
                                            onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Địa chỉ</label>
                                        <input className='form-control'
                                            value={this.state.address}
                                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Biển số xe</label>
                                        <input className='form-control'
                                            value={this.state.licensePlates}
                                            onChange={(event) => this.handleOnchangeInput(event, 'licensePlates')}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Loại xe</label>
                                        <input className='form-control'
                                            value={this.state.typeCar}
                                            onChange={(event) => this.handleOnchangeInput(event, 'typeCar')}
                                        />
                                    </div>
                                    <div className='col-12 form-group'>
                                        <label>Ghi chú</label>
                                        <textarea className='form-control'
                                            value={this.state.note}
                                            onChange={(event) => this.handleOnchangeInput(event, 'note')}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='booking-modal-footer'>

                                <button
                                    onClick={() => this.handleConfirmBooking()}
                                    className='btn-booking-confirm'
                                >
                                    Xác nhận
                                </button>
                                <button
                                    className='btn-booking-cancel'
                                    onClick={closeBookingModal}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </Modal>
                }
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedCustomer: state.customer.isLoggedCustomer,
        customerInfo: state.customer.customerInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
