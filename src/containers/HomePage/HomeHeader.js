import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import video from '../../assets/video-banner.mp4';
import logo from "../../assets/logo.svg";
import { withRouter } from 'react-router';
import { getSearchByKeyword } from '../../services/userService';
import { push } from 'connected-react-router';
import * as actions from "../../store/actions";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSearch: {},
            homepage: true,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.keyword) {
            let keyword = this.props.match.params.keyword;

            let res = await getSearchByKeyword({
                keyword: keyword
            });

            if (res && res.errCode === 0) {
                this.setState({
                    dataSearch: res.data
                })
            }

        }
    }

    handleToggleWeather = () => {
        this.setState({ openWeather: !this.state.openWeather });
    }

    handleSearch = async (e) => {
        e.preventDefault();
        this.props.navigate(`/detail-search?keyword=${e.target.keyword.value}`);
    }

    returnToHome = (e) => {
        // e.preventDefault();
        this.props.navigate(`/home`);
    }

    handlePrice = (e) => {
        e.preventDefault();
        this.props.navigate(`/price`);
    }

    hanhleloginCustomer = (e) => {
        e.preventDefault();
        this.props.navigate(`/login-customer`);
    }

    handleCustomerBooking = (customerInfo) => {
        // this.props.navigate(`/customer-booking/${customerInfo.id}`);
        if (this.props.history) {
            this.props.history.push(`/customer-booking/${customerInfo.id}`)
        }
    }

    render() {
        const { processLogout, customerInfo } = this.props;
        console.log('check state: ', this.props);
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            {this.props.isLoggedCustomer === false &&
                                <i className="fas fa-bars"></i>
                            }
                            {this.props.isLoggedCustomer === true &&
                                <i className="fas fa-calendar-alt customer-booking"
                                    onClick={() => this.handleCustomerBooking(customerInfo)}
                                ></i>
                            }

                            <img className='header-logo' src={logo} onClick={() => this.returnToHome()} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content' onClick={this.handlePrice} >
                                <div className='main-title'><b>Bảng giá</b></div>
                                <div className='subs-title'>Bảng giá chi tiết các dịch vụ</div>
                            </div>
                            <div className='child-content'>
                                <div className='main-title'><b>Các sản phẩm mới</b></div>
                                <div className='subs-title'>Các dòng xe mới của Huyndai</div>
                            </div>
                            <div className='child-content'>
                                <div className='main-title'><b>Liên hệ</b></div>
                                <div className='subs-title'>Các thông tin liên hệ</div>
                            </div>
                        </div>

                        <div className='right-content'>
                            <div className='login-customer' onClick={this.hanhleloginCustomer}>
                                {this.props.isLoggedCustomer === false &&
                                    <>
                                        <div className='title-login'>Đăng nhập</div>
                                        <i className="fas fa-sign-in-alt"></i>
                                    </>
                                }
                                {this.props.isLoggedCustomer === true &&
                                    <>
                                        <div className='hello'>Xin chào, </div>
                                        <div className='customer-name'>
                                            {customerInfo && customerInfo.lastName ? customerInfo.lastName : ''}
                                        </div>
                                        <div className="btn btn-logout-customer" onClick={processLogout} title="Đăng xuất">
                                            <i className="fas fa-sign-out-alt"></i>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {this.props.isshowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='banner-container'>
                            <video className='video' src={video} width="100%" height="80%" muted autoPlay={"autoPlay"} preload="auto" loop >
                            </video>
                            <div className='banner-content'>
                                <div className='title1'>ĐẶT LỊCH BẢO DƯỠNG XE</div>
                                <div className='title2'>DỊCH VỤ TỐT NHẤT DÀNH CHO BẠN</div>
                                <div className='search'>
                                    <i className="fas fa-search"></i>
                                    <form onSubmit={this.handleSearch}>
                                        <input type='text' name="keyword" placeholder='Nhập từ khóa cần tìm kiếm ...' />
                                    </form>
                                </div>
                                {/* <div className='weather-banner'>
                                {this.state.openWeather ?
                                    <Iframe src="/weather/index.html"
                                        width="450px"
                                        height="450px"
                                        id="myId"
                                        display="initial"
                                        position="relative" />
                                    : <></>
                                }
                            </div> */}
                                {/* <button onClick={this.handleToggleWeather}>Tat</button> */}
                            </div>

                        </div>
                    </div>
                }
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedCustomer: state.customer.isLoggedCustomer,
        customerInfo: state.customer.customerInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
