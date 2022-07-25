import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageBookingCustomer.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllCustomerForStaff, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';


class ManageBookingCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataCustomer: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }


    async componentDidMount() {
        this.getDataCustomer()
    }

    getDataCustomer = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllCustomerForStaff({
            staffId: user.id,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataCustomer: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataCustomer()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            staffId: item.staffId,
            customerId: item.customerId,
            email: item.customerData.email,
            timeType: item.timeType,
            customerName: item.customerData.firstName
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })

        let res = await postSendRemedy({
            email: dataChild.email,
            imgBase64: dataChild.imgBase64,
            staffId: dataModal.staffId,
            customerId: dataModal.customerId,
            timeType: dataModal.timeType,
            customerName: dataModal.customerName
        });

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Gửi hóa đơn thành công!')
            this.closeRemedyModal();
            await this.getDataCustomer();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Gửi hóa đơn không thành công!')
        }
    }

    render() {
        let { dataCustomer, isOpenRemedyModal, dataModal } = this.state;
        console.log('check dataCustomer', dataCustomer);
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Đang thực hiện...'
                >

                    <div className='manage-customer-container'>
                        <div className='m-c-title'>
                            QUẢN LÝ LỊCH HẸN
                        </div>
                        <div className='manage-customer-body row'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 table-manage-customer'>
                            <table id="TableManageNews" style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Họ và tên</th>
                                        <th>Thời gian</th>
                                        <th>Địa chỉ</th>
                                        <th>SĐT</th>
                                        <th>Biển số xe</th>
                                        <th>Loại xe</th>
                                        <th>Ghi chú</th>
                                        <th>Tùy chỉnh</th>
                                    </tr>
                                    {dataCustomer && dataCustomer.length > 0 ?
                                        dataCustomer.map((item, index) => {
                                            let time = item.timeTypeDataCustomer.valueVi
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.customerData.firstName} {item.customerData.lastName}</td>
                                                    <td>{item.timeTypeDataCustomer.valueVi}</td>
                                                    <td>{item.customerData.address}</td>
                                                    <td>{item.customerData.phoneNumber}</td>
                                                    <td>{item.licensePlates}</td>
                                                    <td>{item.typeCar}</td>
                                                    <td>{item.note}</td>
                                                    <td>
                                                        <button className='mp-btn-confirm'
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >
                                                            Xác nhận
                                                        </button>

                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td colSpan='12' style={{ textAlign: 'center' }}>Không có lịch hẹn</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />

                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookingCustomer);
