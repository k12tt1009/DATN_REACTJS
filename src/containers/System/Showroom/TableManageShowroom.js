import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageShowroom.scss';
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { CRUD_ACTIONS } from '../../../utils';
import { emitter } from '../../../utils/emitter';
import { editAShowroom } from '../../../services/userService';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageShowroom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showroomRedux: [],
            showroomEdit: {}
        }
    }

    componentDidMount() {
        this.props.fetchShowroomRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listShowroom !== this.props.listShowroom) {
            this.setState({
                showroomRedux: this.props.listShowroom,
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleDeleteShowroom = (showrooms) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
            this.props.deleteAShowroomRedux(showrooms.id);
        }
    }

    handleEditShowroom = (showrooms) => {
        this.props.handleEditShowroomFromParentKey(showrooms)
    }

    render() {
        let arrShowrooms = this.state.showroomRedux;
        return (
            <React.Fragment>
                <table id="TableManageShowroom">

                    <tbody>
                        <tr>
                            <th>Tên xưởng dịch vụ</th>
                            <th>Tùy chỉnh</th>
                        </tr>
                        {arrShowrooms && arrShowrooms.length > 0 &&

                            arrShowrooms.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td width={1385} height={70}>{item.name}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditShowroom(item)}
                                                className='btn-edit'><i className="fas fa-edit"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteShowroom(item)}
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
        listShowroom: state.admin.showrooms
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchShowroomRedux: () => dispatch(actions.fetchAllShowroomStart()),
        deleteAShowroomRedux: (id) => dispatch(actions.deleteAShowroom(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageShowroom);
