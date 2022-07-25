import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getTopNewsHomeService } from '../../../services/userService';
import "./News.scss";
import { withRouter } from 'react-router';


class News extends Component {
    state = {
        openWeather: false,
    }

    handleToggleWeather = () => {
        this.setState({ openWeather: !this.state.openWeather });
    }

    constructor(props) {
        super(props)
        this.state = {
            dataNews: []
        }
    }

    async componentDidMount() {
        let res = await getTopNewsHomeService('');
        if (res && res.errCode === 0) {
            this.setState({
                dataNews: res.data ? res.data : []
            })
        }
    }

    handleViewDetailNews = (news) => {
        console.log('check view: ', news);

        this.props.history.push(`/detail-news/${news.id}`)

    }

    render() {
        let { dataNews } = this.state;
        return (
            <div className="section-share section-news">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Nhịp sống ô tô</span>
                        <button className="btn-section-news">Xem thêm</button>
                    </div>

                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataNews && dataNews.length > 0 &&
                                dataNews.map((item, index) => {
                                    return (
                                        <div className="section-customize news-child" key={index} onClick={() => this.handleViewDetailNews(item)}>
                                            <div
                                                className="bg-image section-news"
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="news-name">{item.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));

