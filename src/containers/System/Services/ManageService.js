import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageServices.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { createNewService, editService } from '../../../services/userService';
import { toast } from "react-toastify";
import TableManageService from './TableManageService';
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            //imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: '',
            avatar: '',
            tags: '',

            action: CRUD_ACTIONS.CREATE,
            serviceEditId: ''
        }
    }


    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                name: '',
                // imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: '',
                avatar: '',
                tags: '',
                //action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('check base64 image: ', base64)
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

    handleSaveNewService = async () => {
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createNewService(this.state)
            if (res && res.errCode === 0) {
                toast.success('Thêm mới gói dịch vụ thành công!')
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewImgURL: '',
                    tags: '',
                })
                setTimeout(() => {
                    this.props.fetchServicesRedux();
                }, 500)
            } else {
                toast.error('Thêm mới gói dịch vụ không thành công!')
            }
        };
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editServiceStartRedux({
                id: this.state.serviceEditId,
                name: this.state.name,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                avatar: this.state.avatar,
                tags: this.state.tags,
            })
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: '',
                tags: '',
                action: CRUD_ACTIONS.CREATE
            })
        }

    }

    handleEditServiceFromParent = (services) => {
        let imageBase64 = ''
        if (services.image) {
            imageBase64 = services.image;
        }
        this.setState({
            name: services.name,
            avatar: '',
            descriptionHTML: services.descriptionHTML,
            descriptionMarkdown: services.descriptionMarkdown,
            tags: services.tags,
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            serviceEditId: services.id
        })
    }

    render() {

        return (
            <div className='manage-service-container'>
                <div className='ms-title'>Quản lý gói dịch vụ</div>

                <div className='add-new-service row'>
                    <div className='col-6 form-group'>
                        <label>Tên gói dịch vụ</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Tags</label>
                        <input className='form-control' type='text' value={this.state.tags}
                            onChange={(event) => this.handleOnchangeInput(event, 'tags')}
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
                            onClick={() => this.handleSaveNewService()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? 'Lưu thay đổi' : 'Lưu gói dịch vụ'}

                        </button>
                    </div>

                    <div className='col-12'>
                        <TableManageService
                            handleEditServiceFromParentKey={this.handleEditServiceFromParent}
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
        listServices: state.admin.services
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchServicesRedux: () => dispatch(actions.fetchAllServiceStart()),
        editServiceStartRedux: (data) => dispatch(actions.editServiceStart(data)),
        createServiceStartRedux: (data) => dispatch(actions.createNewService(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageService);
