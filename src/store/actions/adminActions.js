import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopStaffHomeService,
    getAllStaffs, saveDetailStaffService,
    getAllService, getAllNews, deleteNewsService, editNewsService,
    getAllShowroom, deleteServices, editService, deleteShowroom,
    editAShowroom, registerCustomer, getAllBooking, deleteBooking,
    getCustomerBooking, getTopServiveHomeService

} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

//Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderStart error', e)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionStart error', e)
        }
    }

}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//Role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchGenderStart error', e)
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

//Car
export const fetchCarStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("CAR");
            if (res && res.errCode === 0) {
                dispatch(fetchCarSuccess(res.data))
            } else {
                dispatch(fetchCarFailed());
            }
        } catch (e) {
            dispatch(fetchCarFailed());
            console.log('fetchCarFailed error', e)
        }
    }

}

export const fetchCarSuccess = (carData) => ({
    type: actionTypes.FETCH_CAR_SUCCESS,
    data: carData
})

export const fetchCarFailed = () => ({
    type: actionTypes.FETCH_CAR_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Tạo người dùng thành công!");
                dispatch(saveUserSucces());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailed());
                toast.error("Tạo người dùng không thành công!");
            }
        } catch (e) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e)
        }
    }
}

export const saveUserSucces = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error("Hiển thị danh sách người dùng không thành công!");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Hiển thị danh sách người dùng không thành công!");
            dispatch(fetchAllUsersFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Xóa người dùng thành công!");
                dispatch(deleteUserSucces());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Xóa người dùng không thành công!");
                dispatch(deleteUserfailed());
            }
        } catch (e) {
            dispatch(deleteUserfailed());
            console.log('saveUserFailed error', e)
        }
    }
}

export const deleteUserSucces = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserfailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhập thông tin người dùng thành công!");
                dispatch(editUserSucces());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Cập nhập thông tin người dùng không thành công!");
                dispatch(editUserfailed());
            }
        } catch (e) {
            toast.error("Cập nhập thông tin người dùng không thành công!");
            dispatch(editUserfailed());
            console.log('saveUserFailed error', e)
        }
    }
}

export const editUserSucces = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserfailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

// let res1 = await getTopStaffHomeService('');

export const fetchTopStaff = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopStaffHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_STAFFS_SUCCESS,
                    dataStaffs: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_STAFFS_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_STAFFS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_STAFFS_FAILED
            })
        }
    }
}

export const fetchAllStaff = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllStaffs();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_STAFFS_SUCCESS,
                    dataStaffs: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_STAFFS_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_STAFFS_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_STAFFS_FAILED
            })
        }
    }
}

export const saveDetailStaff = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailStaffService(data);
            console.log('check res: ', data)
            if (res && res.errCode === 0) {
                toast.success("Lưu thông tin chuyên viên thành công!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_STAFF_SUCCESS,
                })
            } else {
                toast.error("Lưu thông tin chuyên viên không thành công!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_STAFF_FAILED
                })
            }
        } catch (e) {
            toast.error("Lưu thông tin chuyên viên không thành công!");
            console.log('SAVE_DETAIL_STAFF_FAILED: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_STAFF_FAILED
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}

//
export const getRequiredStaffInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_STAFF_INFOR_START })

            let resProvince = await getAllCodeService("PROVINCE");
            let resPrice = await getAllCodeService("PRICE");
            let resService = await getAllService();
            let resShowroom = await getAllShowroom();

            if (resPrice && resPrice.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resService && resService.errCode === 0
                && resShowroom && resShowroom.errCode === 0
            ) {
                let data = {
                    resProvince: resProvince.data,
                    resPrice: resPrice.data,
                    resService: resService.data,
                    resShowroom: resShowroom.data
                }
                dispatch(fetchRequiredStaffInforSuccess(data))
            } else {
                dispatch(fetchRequiredStaffInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredStaffInforFailed());
            console.log('getRequiredStaffInfor error', e)
        }
    }

}

export const fetchRequiredStaffInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_STAFF_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredStaffInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_STAFF_INFOR_FAILED
})

export const fetchAllNewsStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllNews();
            if (res && res.errCode === 0) {
                dispatch(fetchAllNewsSuccess(res.data.reverse()))
            } else {
                toast.error("Hiển thị danh sách bài viết không thành công!");
                dispatch(fetchAllNewsFailed());
            }
        } catch (e) {
            toast.error("Hiển thị danh sách bài viết không thành công!");
            dispatch(fetchAllNewsFailed());
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchAllNewsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_NEWS_SUCCESS,
    news: data
})

export const fetchAllNewsFailed = () => ({
    type: actionTypes.FETCH_ALL_NEWS_FAILED,
})

export const deleteNews = (newsId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteNewsService(newsId);
            if (res && res.errCode === 0) {
                toast.success("Xóa bài viết thành công!");
                dispatch(deleteNewsSuccess());
                dispatch(fetchAllNewsStart());
            } else {
                toast.error("Xóa bài viết không thành công!");
                dispatch(deleteNewsFailed());
            }
        } catch (e) {
            dispatch(deleteNewsFailed());
            console.log('deleteNewsFailed error', e)
        }
    }
}

export const deleteNewsSuccess = (data) => ({
    type: actionTypes.DELETE_NEWS_SUCCESS,
    news: data
})

export const deleteNewsFailed = () => ({
    type: actionTypes.DELETE_NEWS_FAILED,
})

export const editNews = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editNewsService(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật bài viết thành công!");
                dispatch(editNewsSuccess());
                dispatch(fetchAllNewsStart());
            } else {
                toast.error("Cập nhật bài viết không thành công!");
                dispatch(editNewsFailed());
            }
        } catch (e) {
            dispatch(editNewsFailed());
            console.log('editNewsFailed error', e)
        }
    }
}

export const editNewsSuccess = () => ({
    type: actionTypes.EDIT_NEWS_SUCCESS,
})

export const editNewsFailed = () => ({
    type: actionTypes.EDIT_NEWS_FAILED,
})

//Service

export const fetchTopService = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopServiveHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_SERVICES_SUCCESS,
                    dataServices: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_SERVICES_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_SERVICES_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_SERVICES_FAILED
            })
        }
    }
}

export const fetchAllServiceStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllServiceSuccess(res.data.reverse()))
            } else {
                toast.error("Hiển thị danh sách gói dịch vụ không thành công!");
                dispatch(fetchAllServiceFailed());
            }
        } catch (e) {
            toast.error("Hiển thị danh sách gói dịch vụ không thành công!");
            dispatch(fetchAllServiceFailed());
            console.log('fetchAllServiceFailed error', e)
        }
    }
}

export const fetchAllServiceSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SERVICE_SUCCESS,
    services: data
})

export const fetchAllServiceFailed = () => ({
    type: actionTypes.FETCH_ALL_SERVICE_FAILED,
})

export const createNewService = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewService(data);
            if (res && res.errCode === 0) {
                toast.success("Tạo gói thành công!");
                dispatch(saveServiceSucces());
                dispatch(fetchAllServiceStart());
            } else {
                dispatch(saveServiceFailed());
            }
        } catch (e) {
            dispatch(saveServiceFailed());
            console.log('saveServiceFailed error', e)
        }
    }
}

export const saveServiceSucces = () => ({
    type: actionTypes.CREATE_SERVICE_SUCCESS
})

export const saveServiceFailed = () => ({
    type: actionTypes.CREATE_SERVICE_FAILED
})

export const deleteService = (servicesId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteServices(servicesId);
            if (res && res.errCode === 0) {
                toast.success("Xóa gói dịch vụ thành công!");
                dispatch(deleteServiceSuccess());
                dispatch(fetchAllServiceStart());
            } else {
                toast.error("Xóa gói dịch vụ không thành công!");
                dispatch(deleteServiceFailed());
            }
        } catch (e) {
            dispatch(deleteServiceFailed());
            console.log('deleteServiceFailed error', e)
        }
    }
}

export const deleteServiceSuccess = (servicesId) => ({
    type: actionTypes.DELETE_SERVICE_SUCCESS,
    services: servicesId
})

export const deleteServiceFailed = () => ({
    type: actionTypes.DELETE_SERVICE_FAILED,
})

export const editServiceStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editService(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật gói dịch vụ thành công!");
                dispatch(editServiceSuccess());
                dispatch(fetchAllServiceStart());
            } else {
                toast.error("Cập nhật gói dịch vụ không thành công!");
                dispatch(editServiceFailed());
            }
        } catch (e) {
            dispatch(editServiceFailed());
            console.log('editServiceFailed error', e)
        }
    }
}

export const editServiceSuccess = () => ({
    type: actionTypes.EDIT_SERVICE_SUCCESS,
})

export const editServiceFailed = () => ({
    type: actionTypes.EDIT_SERVICE_FAILED,
})

//showroom
export const fetchAllShowroomStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllShowroom();
            if (res && res.errCode === 0) {
                dispatch(fetchAllShowroomSuccess(res.data.reverse()))
            } else {
                toast.error("Hiển thị danh sách gói dịch vụ không thành công!");
                dispatch(fetchAllShowroomFailed());
            }
        } catch (e) {
            toast.error("Hiển thị danh sách gói dịch vụ không thành công!");
            dispatch(fetchAllShowroomFailed());
            console.log('fetchAllServiceFailed error', e)
        }
    }
}

export const fetchAllShowroomSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_SHOWROOM_SUCCESS,
    showrooms: data
})

export const fetchAllShowroomFailed = () => ({
    type: actionTypes.FETCH_ALL_SHOWROOM_FAILED,
})

export const deleteAShowroom = (showroomsId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteShowroom(showroomsId);
            if (res && res.errCode === 0) {
                toast.success("Xóa xưởng dịch vụ thành công!");
                dispatch(deleteShowroomSuccess());
                dispatch(fetchAllShowroomStart());
            } else {
                toast.error("Xóa xưởng dịch vụ không thành công!");
                dispatch(deleteShowroomFailed());
            }
        } catch (e) {
            dispatch(deleteShowroomFailed());
            console.log('deleteShowroomFailed error', e)
        }
    }
}

export const deleteShowroomSuccess = (showroomsId) => ({
    type: actionTypes.DELETE_SHOWROOM_SUCCESS,
    showrooms: showroomsId
})

export const deleteShowroomFailed = () => ({
    type: actionTypes.DELETE_SHOWROOM_FAILED,
})

export const editShowroomStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editAShowroom(data);
            if (res && res.errCode === 0) {
                toast.success("Cập nhật xưởng dịch vụ thành công!");
                dispatch(editShowroomSuccess());
                dispatch(fetchAllShowroomStart());
            } else {
                toast.error("Cập nhật xưởng dịch vụ không thành công!");
                dispatch(editShowroomFailed());
            }
        } catch (e) {
            dispatch(editShowroomFailed());
            console.log('editShowroomFailed error', e)
        }
    }
}

export const editShowroomSuccess = () => ({
    type: actionTypes.EDIT_SHOWROOM_SUCCESS,
})

export const editShowroomFailed = () => ({
    type: actionTypes.EDIT_SHOWROOM_FAILED,
})

//CUSTOMER
export const registerCustomerStar = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await registerCustomer(data);
            if (res && res.errCode === 0) {
                toast.success("Đăng ký thành công!");
                dispatch(registerCustomerSucces());
            } else if (res && res.errCode === 1) {
                dispatch(registerCustomerFailed());
                toast.error("Email đã tồn tại. Vui lòng thử email khác!");
            }
            else {
                dispatch(registerCustomerFailed());
                toast.error("Đăng ký không thành công!");
            }
        } catch (e) {
            dispatch(registerCustomerFailed());
            console.log('registerCustomerFailed error', e)
        }
    }
}

export const registerCustomerSucces = () => ({
    type: actionTypes.CUSTOMER_REGISTER_SUCCESS
})

export const registerCustomerFailed = () => ({
    type: actionTypes.CUSTOMER_REGISTER_FAIL
})

//BOOKING
export const fetchAllBookingStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllBooking();
            if (res && res.errCode === 0) {
                dispatch(fetchAllBookingSuccess(res.data))
            } else {
                dispatch(fetchAllBookingFailed());
            }
        } catch (e) {
            dispatch(fetchAllBookingFailed());
            console.log('fetchAllBookingFailed error', e)
        }
    }

}

export const fetchAllBookingSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_BOOKING_SUCCESS,
    bookings: data
})

export const fetchAllBookingFailed = () => ({
    type: actionTypes.DELETE_BOOKING_FAILED
})

export const deleteABooking = (bookingId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBooking(bookingId);
            if (res && res.errCode === 0) {
                toast.success("Xóa lịch hẹn thành công!");
                dispatch(deleteBookingSuccess());
                dispatch(fetchAllBookingStart());
            } else {
                toast.error("Xóa lịch hẹn không thành công!");
                dispatch(deleteBookingFailed());
            }
        } catch (e) {
            dispatch(deleteBookingFailed());
            console.log('deleteBookingFailed error', e)
        }
    }
}

export const deleteBookingSuccess = (bookingId) => ({
    type: actionTypes.DELETE_BOOKING_SUCCESS,
    bookings: bookingId
})

export const deleteBookingFailed = () => ({
    type: actionTypes.DELETE_BOOKING_FAILED
})

export const fetchCustomerBookingStart = (customerId) => {
    return async (dispatch, getState) => {
        try {

            let res = await getCustomerBooking(customerId);
            if (res && res.errCode === 0) {
                dispatch(fetchCustomerBookingSuccess(res.data))
            } else {
                dispatch(fetchCustomerBookingFailed());
            }
        } catch (e) {
            dispatch(fetchCustomerBookingFailed());
            console.log('fetchCustomerBookingFailed error', e)
        }
    }

}

export const fetchCustomerBookingSuccess = (customerId) => ({
    type: actionTypes.FETCH_CUSTOMER_BOOKING_SUCCESS,
    Customerbookings: customerId
})

export const fetchCustomerBookingFailed = () => ({
    type: actionTypes.FETCH_CUSTOMER_BOOKING_FAILED
})