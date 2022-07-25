import React, { Component } from 'react';
import { connect } from "react-redux";
import NumberFormat from 'react-number-format';

class History extends Component {

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
        const { processLogout, customerInfo } = this.props;
        return (
            <div section-share section-specialty>
                <div className="section-container">
                    <div className="section-header">
                        {this.props.isLoggedCustomer === true &&
                            <i className="fas fa-calendar-alt customer-booking"

                            ></i>
                        }
                    </div>
                </div>
            </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
