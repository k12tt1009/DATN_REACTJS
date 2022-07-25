import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageShowroom.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { createNewShowroom, editAShowroom } from '../../../services/userService';
import { toast } from "react-toastify";
import TableManageShowroom from './TableManageShowroom';
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageShowroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            //imageBase64: '',
            address: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
            previewImgURL: '',
            avatar: '',

            action: CRUD_ACTIONS.CREATE,
            showroomEditId: ''
        }
    }


    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
                previewImgURL: '',
                avatar: '',
                //action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleSaveNewShowroom = async () => {
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createNewShowroom(this.state)
            if (res && res.errCode === 0) {
                toast.success('Thêm mới xưởng dịch vụ thành công!')
                this.setState({
                    name: '',
                    imageBase64: '',
                    address: '',
                    descriptionMarkdown: '',
                    descriptionHTML: '',
                    previewImgURL: '',
                })
                setTimeout(() => {
                    this.props.fetchShowroomRedux();
                }, 500)
            } else {
                toast.error('Thêm mới xưởng dịch vụ không thành công!')
            }
        };
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editShowroomStartRedux({
                id: this.state.showroomEditId,
                name: this.state.name,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                avatar: this.state.avatar
            })
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE
            })
        }

    }

    handleEditShowroomFromParent = (showrooms) => {
        let imageBase64 = ''
        if (showrooms.image) {
            imageBase64 = showrooms.image;
        }
        this.setState({
            name: showrooms.name,
            address: showrooms.address,
            descriptionHTML: showrooms.descriptionHTML,
            descriptionMarkdown: showrooms.descriptionMarkdown,
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            showroomEditId: showrooms.id
        })
    }

    render() {

        return (
            <div className='manage-service-container'>
                <div className='ms-title'>Quản lý xưởng dịch vụ</div>

                <div className='add-new-service row'>
                    <div className='col-6 form-group'>
                        <label>Tên xưởng dịch vụ</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 mb-3'>
                        <label>Hình ảnh</label>
                        <div className='preview-img-container'>
                            <input id='previewImg' type='file' hidden
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                            <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload"></i></label>
                            <div className='preview-image'
                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                onClick={() => this.openPreviewImage()}
                            >
                            </div>
                        </div>
                    </div>
                    <div className='col-12 form-group'>
                        <label>Địa chỉ xưởng dịch vụ</label>
                        <input className='form-control' type='text' value={this.state.address}
                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '420px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>

                    <div className='col-12'>
                        <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning mt-3 mb-3 ' :
                            'btn btn-primary mt-3 mb-3'}
                            onClick={() => this.handleSaveNewShowroom()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? 'Lưu thay đổi' : 'Lưu xưởng dịch vụ'}

                        </button>
                    </div>

                    <div className='col-12'>
                        <TableManageShowroom
                            handleEditShowroomFromParentKey={this.handleEditShowroomFromParent}
                            actions={this.state.action}
                        />
                    </div>

                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        listShowroom: state.admin.showrooms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchShowroomRedux: () => dispatch(actions.fetchAllShowroomStart()),
        editShowroomStartRedux: (data) => dispatch(actions.editShowroomStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageShowroom);
