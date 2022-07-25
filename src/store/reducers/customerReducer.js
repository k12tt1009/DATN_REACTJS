import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedCustomer: false,
    customerInfo: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CUSTOMER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedCustomer: true,
                customerInfo: action.customerInfo
            }
        case actionTypes.CUSTOMER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedCustomer: false,
                customerInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedCustomer: false,
                customerInfo: null
            }
        default:
            return state;
    }
}

export default appReducer;