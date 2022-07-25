import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const registerCustomer = (data) => {
    return axios.post('/api/customer-register', data)
}

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopStaffHomeService = (limit) => {
    return axios.get(`/api/top-staff-home?limit=${limit}`)
}

const getAllStaffs = () => {
    return axios.get(`/api/get-all-staffs`)
}

const saveDetailStaffService = (data) => {
    return axios.post('/api/save-infor-staffs', data)
}

const getDetailInforStaff = (inputId) => {
    return axios.get(`/api/get-detail-staff-by-id?id=${inputId}`)
}

const saveBulkScheduleStaff = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleStaffByDate = (staffId, date) => {
    return axios.get(`/api/get-schedule-staff-by-date?staffId=${staffId}&date=${date}`)
}

const getExtraInforStaffById = (staffId) => {
    return axios.get(`/api/get-extra-infor-staff-by-id?staffId=${staffId}`)
}

const getProfileStaffById = (staffId) => {
    return axios.get(`/api/get-profile-staff-by-id?staffId=${staffId}`)
}

const postCustomerBookAppointment = (data) => {
    return axios.post('/api/customer-book-appointment', data)
}

const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

const createNewService = (data) => {
    return axios.post('/api/create-new-service', data)
}

const getAllService = () => {
    return axios.get(`/api/get-all-service`)
}

const getTopServiveHomeService = (limit) => {
    return axios.get(`/api/get-top-service?limit=${limit}`)
}

const createNews = (data) => {
    return axios.post('/api/create-news', data)
}

const getAllNews = () => {
    return axios.get(`/api/get-all-news`)
}

const getTopNewsHomeService = (limit) => {
    return axios.get(`/api/get-top-news?limit=${limit}`)
}

const getDetailNews = (inputId) => {
    return axios.get(`/api/get-detail-news-by-id?id=${inputId}`)
}

const deleteNewsService = (newsId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-news', {
        data: {
            id: newsId
        }
    });
}

const editNewsService = (inputData) => {
    return axios.put('/api/edit-news', inputData);
}

const getAllDetailServiceById = (data) => {
    return axios.get(`/api/get-detail-service-by-id?id=${data.id}&location=${data.location}`)
}

const createNewShowroom = (data) => {
    return axios.post('/api/create-new-showroom', data)
}

const getAllShowroom = () => {
    return axios.get(`/api/get-showroom`)
}

const getTopShowroomHomeService = (limit) => {
    return axios.get(`/api/get-top-showroom?limit=${limit}`)
}

const getAllDetailShowroomById = (data) => {
    return axios.get(`/api/get-detail-showroom-by-id?id=${data.id}`)
}

const getAllCustomerForStaff = (data) => {
    return axios.get(`/api/get-list-customer-for-staff?staffId=${data.staffId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post('/api/send-remedy', data)
}

const deleteServices = (servicesId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-service', {
        data: {
            id: servicesId
        }
    });
}

const editService = (inputData) => {
    return axios.put('/api/edit-service', inputData);
}

const deleteShowroom = (showroomsId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-showroom', {
        data: {
            id: showroomsId
        }
    });
}

const editAShowroom = (inputData) => {
    return axios.put('/api/edit-showroom', inputData);
}

const getSearchByKeyword = (keyword) => {
    return axios.get(`/api/get-search-by-keyword?keyword=${keyword}`)
}

const getAllBooking = () => {
    return axios.get(`/api/get-all-booking`)
}

const deleteBooking = (bookingId) => {
    return axios.delete('/api/delete-booking', {
        data: {
            id: bookingId
        }
    });
}

const getCustomerBooking = (customerId) => {
    return axios.get(`/api/get-list-booking-customer?id=${customerId}`)
}

export {
    handleLoginApi, deleteNewsService,
    getAllUsers, editNewsService,
    createNewUserService, getAllDetailServiceById,
    deleteUserService, createNewShowroom,
    editUserService, getAllShowroom,
    getAllCodeService, getAllDetailShowroomById,
    getTopStaffHomeService, getAllCustomerForStaff,
    getAllStaffs, postSendRemedy, deleteServices,
    saveDetailStaffService, editService,
    getDetailInforStaff, deleteShowroom,
    saveBulkScheduleStaff, editAShowroom,
    getScheduleStaffByDate, getSearchByKeyword,
    getExtraInforStaffById, registerCustomer,
    getProfileStaffById, getAllBooking,
    postCustomerBookAppointment, deleteBooking,
    postVerifyBookAppointment, getCustomerBooking,
    createNewService, getTopServiveHomeService,
    getAllService, getTopShowroomHomeService,
    createNews, getTopNewsHomeService,
    getAllNews,
    getDetailNews
}
