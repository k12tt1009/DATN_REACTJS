import axios from "../axios";

const handleLoginCustomer = (customerEmail, customerPassword) => {
    return axios.post('/api/customer-login', { email: customerEmail, password: customerPassword });
}

export {
    handleLoginCustomer
}