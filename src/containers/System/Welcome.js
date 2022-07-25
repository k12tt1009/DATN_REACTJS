import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from "../../assets/logo.svg";
import './Welcome.scss';

class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {

        return (
            <>
                <div className='title-welcome'>TRANG QUẢN LÝ HỆ THỐNG CAR MAINTENANCE</div>
                <div className='wecome-logo'>
                    <img className='logo-img' src={logo} />
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
