import React, { Component } from 'react';
import { connect } from "react-redux";
import './CustomerBooking.scss';
import * as actions from "../../../store/actions";
import { getCustomerBooking } from "../../../services/userService";
import moment from 'moment';
import HomeHeader from '../../HomePage/HomeHeader';

class CustomerBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataBooking: [],
            homepage: false
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let customerId = this.props.match.params.id;

            let date = moment(new Date()).format('DD/MM/YYYY');

            let res = await getCustomerBooking(customerId);
            if (res && res.errCode === 0) {
                this.setState({
                    dataBooking: res.data,
                    date: date
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { dataBooking } = this.state;
        console.log('check state: ', this.state);
        return (
            <>
                < HomeHeader />
                <div className='title-manage-booking'>Quản lý lịch hẹn</div>
                <table id="TableCustomerBooking">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Chuyên viên</th>
                            <th>Ngày</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Biển số xe</th>
                            <th>Loại xe</th>
                            <th>Trạng thái</th>
                        </tr>
                        {dataBooking && dataBooking.length > 0 &&

                            dataBooking.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.staffName}</td>
                                        <td>{moment(moment.unix(item.date / 1000)).format("DD//MM/YYYY")}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.address}</td>
                                        <td>{item.licensePlates}</td>
                                        <td>{item.typeCar}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleDeleteBooking(item)}
                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        customer: state.customer.customerInfo,
        listBookings: state.admin.Customerbookings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCustomerBookingRedux: () => dispatch(actions.fetchCustomerBookingStart()),
        deleteABookingRedux: (id) => dispatch(actions.deleteABooking())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerBooking);
