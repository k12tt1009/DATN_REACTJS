import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageService.scss';
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

class TableManageService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchServicesRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listServices !== this.props.listServices) {
            this.setState({
                serviceRedux: this.props.listServices,
                actions: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleDeleteService = (services) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
            this.props.deleteServicesRedux(services.id);
        }
    }

    handleEditService = (services) => {
        console.log('edit service: ', services)
        this.props.handleEditServiceFromParentKey(services)
    }

    render() {
        let arrServices = this.state.serviceRedux;
        return (
            <React.Fragment>
                <table id="TableManageService">
                    <tbody>
                        <tr>
                            <th>Tên gói dịch vụ</th>
                            <th>Tùy chỉnh</th>
                        </tr>
                        {arrServices && arrServices.length > 0 &&

                            arrServices.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td width={1385} height={70}>{item.name}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditService(item)}
                                                className='btn-edit'><i className="fas fa-edit"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteService(item)}
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
        listServices: state.admin.services
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchServicesRedux: () => dispatch(actions.fetchAllServiceStart()),
        deleteServicesRedux: (id) => dispatch(actions.deleteService(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageService);
