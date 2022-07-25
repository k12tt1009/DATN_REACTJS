import React, { Component } from 'react';
import { connect } from "react-redux";
import './StaffSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleStaffByDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';

class StaffSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }


    async componentDidMount() {

        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let ddMM = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${ddMM}`;
                object.label = today;
            } else {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        this.setState({
            allDays: allDays,
        }, () => {
            this.selectDate(this.props.staffIdFromParent, allDays[0].value);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.staffIdFromParent && this.props.staffIdFromParent !== -1) {
            let staffId = this.props.staffIdFromParent;
            let date = event.target.value

            this.selectDate(staffId, date);
        }
    }

    selectDate = async (staffId, date) => {
        let res = await getScheduleStaffByDate(staffId, date);

        if (res && res.errCode === 0) {
            this.setState({
                allAvalableTime: res.data ? res.data : []
            })
        }

        console.log('check res: ', res)
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        let { allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        console.log('check schedule: ', allAvalableTime);
        return (
            <>
                <div className='staff-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option
                                            value={item.value}
                                            key={index}
                                        >
                                            {item.label}
                                        </option>
                                    )
                                })}
                        </select>
                    </div>

                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className="fas fa-calendar-alt"><span>Lịch làm việc</span></i>
                        </div>
                        <div className='time-content'>
                            {allAvalableTime && allAvalableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {
                                            this.props.isLoggedCustomer && allAvalableTime.map((item, index) => {
                                                let timeDisplay = item.timeTypeData.valueVi
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                    >
                                                        {timeDisplay}
                                                    </button>
                                                )
                                            })
                                        }

                                    </div>

                                    <div className='book-free'>
                                        <span>Đặt lịch miễn phí tại đây<i className="far fa-hand-point-up"></i></span>
                                    </div>
                                </>
                                : <div className='no-schedule'>
                                    {!this.props.isLoggedCustomer && <div className='err-login'>
                                        Vui lòng đăng nhập để xem và đặt lịch bảo dưỡng
                                    </div>}
                                    {this.props.isLoggedCustomer && <div className='err-login'>
                                        Không có lịch làm việc trong ngày này, vui lòng chọn ngày khác!
                                    </div>}

                                </div>
                            }

                        </div>
                    </div>
                </div>
                <BookingModal
                    date={dataScheduleTimeModal.date}
                    isOpenModal={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTimeModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        isLoggedCustomer: state.customer.isLoggedCustomer
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffSchedule);
