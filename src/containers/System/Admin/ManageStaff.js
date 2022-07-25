import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageStaff.scss';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforStaff } from '../../../services/userService';
export const CRUD_ACTIONS = {
    CREATE: "CREATE",
    EDIT: "EDIT",
};


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listStaffs: [],
            hasOldData: false,

            //save to staff_infor table
            listProvince: [],
            listPrice: [],
            listService: [],
            listShowroom: [],

            selectedPrice: '',
            selectedProvince: '',
            selectedService: '',
            selectedShowroom: '',

            nameShowroom: '',
            addressShowroom: '',
            note: '',
            serviceId: '',
            showroomId: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllStaff();
        this.props.getRequiredStaffInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelName = `${item.firstName} ${item.lastName}`;
                    object.label = labelName;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelName = `${item.valueVi} VND`;
                    object.label = labelName;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelName = `${item.valueVi}`;
                    object.label = labelName;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

            if (type === 'SERVICE') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

            if (type === 'SHOWROOM') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }

        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allStaffs !== this.props.allStaffs) {
            let dataSelect = this.buildDataInputSelect(this.props.allStaffs, 'USERS')
            this.setState({
                listStaffs: dataSelect
            })
        }

        if (prevProps.allRequiredStaffInfor !== this.props.allRequiredStaffInfor) {

            let { resProvince, resPrice, resService, resShowroom } = this.props.allRequiredStaffInfor
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectService = this.buildDataInputSelect(resService, 'SERVICE')
            let dataSelectShowroom = this.buildDataInputSelect(resShowroom, 'SHOWROOM')


            this.setState({
                listProvince: dataSelectProvince,
                listPrice: dataSelectPrice,
                listService: dataSelectService,
                listShowroom: dataSelectShowroom
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailStaff({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            staffId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            selectedService: this.state.selectedService.value,
            nameShowroom: this.state.nameShowroom,
            addressShowroom: this.state.addressShowroom,
            note: this.state.note,
            showroomId: this.state.selectedShowroom && this.state.selectedShowroom.value ? this.state.selectedShowroom.value : '',
            serviceId: this.state.selectedService.value
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listProvince, listPrice, listService, listShowroom } = this.state;

        let res = await getDetailInforStaff(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressShowroom = '', nameShowroom = '', note = '',
                priceId = '', provinceId = '', serviceId = '', showroomId = '',
                selectedPrice = '', selectedProvince = '',
                selectedService = '', selectedShowroom = ''
                ;

            if (res.data.Staff_Infor) {
                addressShowroom = res.data.Staff_Infor.addressShowroom;
                nameShowroom = res.data.Staff_Infor.nameShowroom;
                note = res.data.Staff_Infor.note;
                priceId = res.data.Staff_Infor.priceId;
                provinceId = res.data.Staff_Infor.provinceId;
                serviceId = res.data.Staff_Infor.serviceId;
                showroomId = res.data.Staff_Infor.showroomId;

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedService = listService.find(item => {
                    return item && item.value === serviceId
                })
                selectedShowroom = listShowroom.find(item => {
                    return item && item.value === showroomId
                })
            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressShowroom: addressShowroom,
                nameShowroom: nameShowroom,
                note: note,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedService: selectedService,
                selectedShowroom: selectedShowroom
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressShowroom: '',
                nameShowroom: '',
                note: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedService: '',
                selectedShowroom: ''
            })
        }
    };

    handleChangeSelectStaffInfor = async (selectedOption, name) => {
        console.log(selectedOption.value);
        console.log(name);
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <div className='manage-staff-container'>

                <div className='manage-doctor-title'>
                    Quản lý thông tin chuyên viên
                </div>

                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn chuyên viên</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listStaffs}
                            placeholder={'Chọn chuyên viên ...'}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu</label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >

                        </textarea>
                    </div>
                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group'>
                        <label>Chọn giá ước tính</label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectStaffInfor}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá ước tính ...'}
                            name='selectedPrice'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành</label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectStaffInfor}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành ...'}
                            name='selectedProvince'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Tên xưởng dịch vụ</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'nameShowroom')}
                            value={this.state.nameShowroom}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ xưởng dịch vụ</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'addressShowroom')}
                            value={this.state.addressShowroom}
                        />
                    </div>
                    <div className='col-6 form-group w-3'>
                        <label>Ghi chú</label>
                        <input className='form-control'
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Chọn gói dịch vụ</label>
                        <Select
                            value={this.state.selectedService}
                            onChange={this.handleChangeSelectStaffInfor}
                            options={this.state.listService}
                            placeholder={'Chọn gói dịch vụ ...'}
                            name='selectedService'
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Chọn xưởng dịch vụ</label>
                        <Select
                            value={this.state.selectedShowroom}
                            onChange={this.handleChangeSelectStaffInfor}
                            options={this.state.listShowroom}
                            placeholder={'Chọn xưởng dịch vụ ...'}
                            name='selectedShowroom'
                        />
                    </div>
                </div>

                <div className='manage-staff-editor'>
                    <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-staff' : 'create-content-staff'}>
                    {hasOldData === true ?
                        <span>Lưu thay đổi</span> : <span>Tạo thông tin</span>
                    }
                </button>

            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        allStaffs: state.admin.allStaffs,
        allRequiredStaffInfor: state.admin.allRequiredStaffInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStaff: () => dispatch(actions.fetchAllStaff()),
        getRequiredStaffInfor: () => dispatch(actions.getRequiredStaffInfor()),
        saveDetailStaff: (data) => dispatch(actions.saveDetailStaff(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff);
