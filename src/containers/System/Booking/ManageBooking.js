import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageBooking.scss';
import * as actions from "../../../store/actions";

class ManageBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingRedux: []
        }
    }


    async componentDidMount() {
        this.props.fetchAllBookingRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listBookings !== this.props.listBookings) {
            this.setState({
                bookingRedux: this.props.listBookings
            })
        }
    }

    handleDeleteBooking = (booking) => {
        this.props.deleteABookingRedux(booking.id)
    }

    render() {
        let arrBookings = this.state.bookingRedux;
        return (
            <>
                <div className='manage-booking-container'>

                    <div className='title-manage-booking'>Quản lý lịch hẹn</div>
                    <table id="TableManageBooking">
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Chuyên viên</th>
                                <th>Họ tên khách hàng</th>
                                <th>SĐT</th>
                                <th>Địa chỉ</th>
                                <th>Biển số xe</th>
                                <th>Loại xe</th>
                                <th>Trạng thái</th>
                            </tr>
                            {arrBookings && arrBookings.length > 0 &&

                                arrBookings.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.staffName}</td>
                                            <td>{item.firstNameCustomer}  {item.lastNameCustomer}</td>
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
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        listBookings: state.admin.bookings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBookingRedux: () => dispatch(actions.fetchAllBookingStart()),
        deleteABookingRedux: (id) => dispatch(actions.deleteABooking(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageBooking);
