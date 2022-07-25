import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getSearchByKeyword } from '../../services/userService';
import './DetailSearch.scss';
import HomeHeader from './HomeHeader';
// import _ from 'lodash';
// import moment from 'moment';
// import { Link } from 'react-router-dom';

class DetailSearch extends Component {
    constructor(props) {
        super(props);
        this.queryParams = new URLSearchParams(window.location.search)
        this.keyword = this.queryParams.get("keyword")

        this.state = {
            dataProfiles: []
        }
    }


    async componentDidMount() {
        let data = await this.getInfor(this.keyword)
        this.setState({
            dataProfiles: data
        })
    }

    getInfor = async (keyword) => {
        let result = {};
        if (keyword) {
            let res = await getSearchByKeyword(keyword);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.staffId !== prevProps.staffId) {
            // this.getInfor(this.props.staffId)
        }
    }

    handleViewDetail = (id, type) => {
        if (type === "service") {
            this.props.navigate(`/detail-service/${id}`);
        }
        if (type === "showroom") {
            this.props.navigate(`/detail-showroom/${id}`);
        }

    }

    handleSearch = async (e) => {
        e.preventDefault();
        this.props.navigate(`/detail-search?keyword=${e.target.keyword.value}`);
        let data = await this.getInfor(e.target.keyword.value)
        this.setState({
            dataProfiles: []
        }, () => this.setState({ dataProfiles: data }));
    }

    render() {
        let { dataProfiles } = this.state;
        let name = '';
        if (dataProfiles && dataProfiles.name) {
            name = `${dataProfiles.name}`;
        }
        return (
            <React.Fragment>
                <HomeHeader
                    isshowBanner={false}
                />
                <div className='container-search'>
                    <div className='search'>
                        <i className="fas fa-search"></i>
                        <form onSubmit={this.handleSearch}>
                            <input type='text' name="keyword" placeholder='Tìm kiếm' defaultValue={this.keyword} />
                        </form>
                    </div>
                    <div className='req-search'>
                        {dataProfiles.map(dataProfile => (
                            <div className='intro-search' onClick={() => this.handleViewDetail(dataProfile.id, dataProfile.type)}>

                                <div
                                    className='content-left-search'
                                    style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>

                                </div>
                                <div className='content-right-search'>
                                    <div className='up'>
                                        {dataProfile.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='title-err-search'>
                            {(dataProfiles.length === 0) && <>Không tìm thấy thông tin</>}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSearch);
