import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import './Register.scss';
//import { FormattedMessage } from 'react-intl';
import { handleLoginCustomer } from '../../services/customerService';
//import customerService from '../../services/customerService';

class LoginCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            // phoneNumber: '',
            passwordConfirm: '',
            // address: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
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

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Thiếu thông tin: ' + arrCheck[i])
                break;
            }
        }

        return isValid;
    }

    handleRegister = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        if (this.state.password !== this.state.passwordConfirm) {
            alert("Nhập lại mật khẩu không trùng khớp");
            return;
        }

        //fire redux action
        this.props.registerCustomerStar({
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            // address: this.state.address,
            // phonenumber: this.state.phonenumber,
            roleId: 'R3',
        })
        this.setState({
            email: '',
            password: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
        })
        //this.props.navigate(`/login-customer`);
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.navigate(`/login-customer`);
    }

    render() {
        // JSX
        let { email, password, firstName, lastName, passwordConfirm
        } = this.state
        return (
            <div className='login-customer-background'>
                <div className='login-customer-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Đăng ký</div>
                        <div className='col-12 form-group login-input'>
                            <label>Email</label>
                            <input className='form-control' type='email'
                                value={email}
                                onChange={(event) => { this.onChangeInput(event, 'email') }}
                            />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Mật khẩu</label>
                            <input className='form-control' type='password'
                                value={password}
                                onChange={(event) => { this.onChangeInput(event, 'password') }}
                            />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Nhập lại mật khẩu</label>
                            <input className='form-control' type='password'
                                value={passwordConfirm}
                                onChange={(event) => { this.onChangeInput(event, 'passwordConfirm') }}
                            />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Họ</label>
                            <input className='form-control' type='text'
                                value={firstName}
                                onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                            />
                        </div>

                        <div className='col-12 form-group login-input'>
                            <label>Tên</label>
                            <input className='form-control' type='text'
                                value={lastName}
                                onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                            />
                        </div>

                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-register' onClick={() => { this.handleRegister() }}>Đăng ký</button>
                        </div>
                        <div className='col-12 text-center mt-3' onClick={this.handleLogin}>
                            <span className='text-other-register'>Đăng nhập tại đây</span>
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
        registerCustomerStar: (data) => dispatch(actions.registerCustomerStar(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginCustomer);
