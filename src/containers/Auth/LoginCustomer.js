import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './LoginCustomer.scss';
import { toast } from "react-toastify";
//import { FormattedMessage } from 'react-intl';
import { handleLoginCustomer } from '../../services/customerService';
//import customerService from '../../services/customerService';

class LoginCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customername: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            customername: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        }) // Remove the error code before every login

        try {
            let data = await handleLoginCustomer(this.state.customername, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.customerLoginSuccess(data.customer)
                toast.success("Đăng nhập thành công!");
                window.location.href = '/';
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }

        }

    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }

    handleRegister = (e) => {
        e.preventDefault();
        this.props.navigate(`/register-customer`);
    }

    render() {
        // JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Đăng nhập</div>
                        <div className='col-12 form-group login-input'>
                            <label>Tên tài khoản:</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Nhập tên tài khoản'
                                value={this.state.customername}
                                onChange={(event) => this.handleOnChangeUsername(event)}
                                onKeyDown={(event) => this.handleKeyDown(event)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Mật khẩu:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Nhập mật khẩu'
                                    onChange={(event) => { this.handleOnChangePassword(event) }}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span
                                    onClick={() => { this.handleShowHidePassword() }}
                                ><i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>

                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login-customer' onClick={() => { this.handleLogin() }}>Đăng nhập</button>
                        </div>

                        <div className='col-12 text-center mt-3' onClick={this.handleRegister}>
                            <span className='text-other-register'>Đăng ký tại đây</span>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        customerLoginSuccess: (customerInfo) => dispatch(actions.customerLoginSuccess(customerInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCustomer);
