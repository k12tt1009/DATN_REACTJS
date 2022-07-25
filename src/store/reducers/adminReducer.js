import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    news: [],
    topStaffs: [],
    topServices: [],
    allStaffs: [],
    allScheduleTime: [],
    allRequiredStaffInfor: [],
    cars: [],
    services: [],
    showrooms: [],
    bookings: [],
    Customerbookings: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.isLoadingGender = [];
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_STAFFS_SUCCESS:
            state.topStaffs = action.dataStaffs;
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_STAFFS_FAILED:
            state.topStaffs = [];
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_SERVICES_SUCCESS:
            state.topServices = action.dataServices;
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_SERVICES_FAILED:
            state.topServices = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_STAFFS_SUCCESS:
            state.allStaffs = action.dataStaffs;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_STAFFS_FAILED:
            state.allStaffs = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_STAFF_INFOR_SUCCESS:
            state.allRequiredStaffInfor = action.data;

            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_STAFF_INFOR_FAILED:
            state.allRequiredStaffInfor = [];
            return {
                ...state
            }

        default:
            return state;

        case actionTypes.FETCH_CAR_SUCCESS:
            state.cars = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_CAR_FAILED:
            state.cars = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_NEWS_SUCCESS:
            state.news = action.news;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_NEWS_FAILED:
            state.news = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_SERVICE_SUCCESS:
            state.services = action.services;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_SERVICE_FAILED:
            state.services = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_SHOWROOM_SUCCESS:
            state.showrooms = action.showrooms;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_SHOWROOM_FAILED:
            state.showrooms = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_BOOKING_SUCCESS:
            state.bookings = action.bookings;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_BOOKING_FAILED:
            state.bookings = [];
            return {
                ...state
            }

        case actionTypes.FETCH_CUSTOMER_BOOKING_SUCCESS:
            state.Customerbookings = action.Customerbookings;
            return {
                ...state
            }

        case actionTypes.FETCH_CUSTOMER_BOOKING_FAILED:
            state.Customerbookings = [];
            return {
                ...state
            }
    }
}

export default adminReducer;