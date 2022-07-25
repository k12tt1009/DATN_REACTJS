import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash';
import { dateFormat } from '../../../utils';
import { saveBulkScheduleStaff } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listStaffs: [],
            selectedStaff: this.props.userInfo.roleId === 'R2' ? this.buildDataInputSelect([this.props.userInfo])[0] : {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllStaff();
        this.props.fetchAllScheduleTime()
        console.log(this.props.userInfo);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allStaffs !== this.props.allStaffs) {
            let dataSelect = this.buildDataInputSelect(this.props.allStaffs)
            console.log(dataSelect);
            this.setState({
                listStaffs: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {

                data = data.map(item => ({ ...item, isSelected: false }))

            }

            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelName = `${item.firstName} ${item.lastName}`
                object.label = labelName;
                object.value = item.id;
                result.push(object)
            })

        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedStaff: selectedOption });

    };

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;

        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })

            this.setState({
                rangeTime: rangeTime
            })

        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedStaff, currentDate } = this.state
        let result = [];

        if (selectedStaff && _.isEmpty(selectedStaff)) {
            toast.error("Chưa chọn chuyên viên!");
            return;
        }

        if (!currentDate) {
            toast.error("Chưa chọn ngày làm việc!");
            return;
        }

        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        // let formatedDate = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.staffId = selectedStaff.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Chưa chọn khung giờ làm việc!");
                return;
            }
        }

        let res = await saveBulkScheduleStaff({
            arrSchedule: result,
            staffId: selectedStaff.value,
            formatedDate: formatedDate
        })
        if (res && res.errCode === 0) {
            toast.success("Tạo lịch làm việc thành công!");
        } else {
            toast.error("Tạo lịch làm việc không thành công!");
            console.log('saveBulkScheduleStaff', res)
        }
    }

    render() {
        let { rangeTime } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (

            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    Quản lý kế hoạch làm việc của chuyên viên
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className={`col-6 form-group${this.props.userInfo.roleId === 'R2' ? ' hide' : ''}`}>
                            <label>Chọn chuyên viên</label>
                            <Select
                                value={this.state.selectedStaff}
                                onChange={this.handleChangeSelect}
                                options={this.state.listStaffs}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button
                                            className={
                                                item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'
                                            }
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {item.valueVi}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12'>
                            <button
                                className='btn btn-primary btn-save-schedule'
                                onClick={() => this.handleSaveSchedule()}
                            >Lưu thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allStaffs: state.admin.allStaffs,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStaff: () => dispatch(actions.fetchAllStaff()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
