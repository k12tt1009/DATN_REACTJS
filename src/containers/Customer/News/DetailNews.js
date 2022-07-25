import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailNews.scss';
import { getDetailNews } from '../../../services/userService';


class DetailNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            DetailNews: {},
        }
    }


    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetailNews(id);
            if (res && res.errCode === 0) {
                this.setState({
                    DetailNews: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { DetailNews } = this.state;
        return (
            <>
                <HomeHeader
                    isshowBanner={false}
                />
                <div className='news-detail-container'>
                    <div className='name-news'>
                        {DetailNews && DetailNews.name
                            && <span>
                                {DetailNews.name}
                            </span>
                        }
                    </div>
                    <div className='description-news'>
                        {DetailNews && DetailNews.description
                            && <span>
                                {DetailNews.description}
                            </span>
                        }
                    </div>
                    <div className='content-news'>
                        {DetailNews && DetailNews.contentHTML
                            &&
                            <div dangerouslySetInnerHTML={{ __html: DetailNews.contentHTML }}>

                            </div>
                        }
                    </div>
                </div>
                <HomeFooter />

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailNews);
