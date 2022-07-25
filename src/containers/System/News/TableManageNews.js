import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageNews.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { CRUD_ACTIONS } from '../../../utils';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newsRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchNewsRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listNews !== this.props.listNews) {
            this.setState({
                newsRedux: this.props.listNews,
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleDeleteNews = (news) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
            this.props.deleteNewsRedux(news.id);
        }
    }

    handleEditNews = (news) => {
        this.props.handleEditNewsFromParentKey(news)
    }

    render() {
        let arrNews = this.state.newsRedux;
        return (
            <React.Fragment>
                <table id="TableManageNews">
                    <tbody>
                        <tr>
                            <th>Tên bài viết</th>
                            <th>Mô tả</th>
                            <th>Tùy chỉnh</th>
                        </tr>
                        {arrNews && arrNews.length > 0 &&

                            arrNews.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td width={600} height={70}>{item.name}</td>
                                        <td width={780}>{item.description}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditNews(item)}
                                                className='btn-edit'><i className="fas fa-edit"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteNews(item)}
                                                className='btn-delete'><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>

                                )
                            })

                        }

                    </tbody>

                </table>

            </React.Fragment>
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
        deleteNewsRedux: (id) => dispatch(actions.deleteNews(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageNews);
