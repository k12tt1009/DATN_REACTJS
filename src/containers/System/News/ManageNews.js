import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageNews.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { createNews } from '../../../services/userService';
import { toast } from "react-toastify";
import TableManageNews from './TableManageNews';
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            description: '',
            contentHTML: '',
            contentMarkdown: '',
            previewImgURL: '',
            avatar: '',

            action: CRUD_ACTIONS.CREATE,
            newsEditId: ''
        }
    }


    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                name: '',
                imageBase64: '',
                description: '',
                contentHTML: '',
                contentMarkdown: '',
                previewImgURL: '',
                avatar: ''
                // action: CRUD_ACTIONS.CREATE
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
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveNewService = async () => {
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createNews(this.state)
            if (res && res.errCode === 0) {
                toast.success('Thêm mới bài viết thành công!')
                this.setState({
                    name: '',
                    imageBase64: '',
                    description: '',
                    contentHTML: '',
                    contentMarkdown: '',
                    previewImgURL: '',
                })
                setTimeout(() => {
                    this.props.fetchNewsRedux();
                }, 500)
            } else {
                toast.error('Thêm mới bài viết không thành công!')
            }
        };
        if (action === CRUD_ACTIONS.EDIT)
            this.props.editNewsStartRedux({
                id: this.state.newsEditId,
                name: this.state.name,
                description: this.state.description,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                avatar: this.state.avatar
            })
        this.setState({
            name: '',
            imageBase64: '',
            description: '',
            contentHTML: '',
            contentMarkdown: '',
            previewImgURL: '',
            action: CRUD_ACTIONS.CREATE
        })

    }

    handleEditNewsFromParent = (news) => {
        let imageBase64 = ''
        if (news.image) {
            imageBase64 = news.image;
        }
        this.setState({
            name: news.name,
            avatar: '',
            description: news.description,
            contentHTML: news.contentHTML,
            contentMarkdown: news.contentMarkdown,
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            newsEditId: news.id
        })
    }

    render() {

        return (
            <div className='manage-service-container'>
                <div className='ms-title'>Quản lý bài viết</div>

                <div className='add-new-service row'>
                    <div className='col-6 form-group'>
                        <label>Tên bài viết</label>
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
                    <div className='col-12 form-group mb-3'>
                        <label>Mô tả</label>
                        <textarea className='form-control' type='text' value={this.state.description}
                            onChange={(event) => this.handleOnchangeInput(event, 'description')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor
                            style={{ height: '420px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning mt-3 mb-3 ' :
                            'btn btn-primary mt-3 mb-3'}
                            onClick={() => this.handleSaveNewService()}
                        >
                            {this.state.action === CRUD_ACTIONS.EDIT ? 'Lưu thay đổi' : 'Lưu bài viết'}

                        </button>
                    </div>

                    <div className='col-12'>
                        <TableManageNews
                            handleEditNewsFromParentKey={this.handleEditNewsFromParent}
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
        listNews: state.admin.news
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNewsRedux: () => dispatch(actions.fetchAllNewsStart()),
        editNewsStartRedux: (data) => dispatch(actions.editNews(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageNews);
