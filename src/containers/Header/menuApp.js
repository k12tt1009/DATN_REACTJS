//Admin
export const adminMenu = [

    {
        name: 'Trang chủ',
        menus: [
            {
                name: 'Trang chủ', link: '/system/welcome'
            }
        ]
    },

    { //Quản lý người dùng

        name: 'menu.admin.manage-user',
        menus: [

            // {
            //     name: 'Trang chủ', link: '/system/welcome'
            // },

            {
                name: 'Quản lý người dùng', link: '/system/user-redux'
            },

            {
                name: 'menu.admin.manage-staff', link: '/system/manage-staff'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },

            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            { //Quản lý kế hoạch làm việc

                name: 'menu.staff.manage-schedule', link: '/staff/manage-schedule'

            },

        ]
    },

    { //Quản lý xưởng dịch vụ
        name: 'menu.admin.showroom',
        menus: [

            {
                name: 'menu.admin.manage-showroom', link: '/system/manage-showroom'
            },

        ]
    },

    { //Quản lý gói dịch vụ
        name: 'menu.admin.specialty',
        menus: [

            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-service-pack'
            },

        ]
    },

    { //Quản lý tin tức
        name: 'menu.admin.news',
        menus: [

            {
                name: 'menu.admin.manage-news', link: '/system/manage-news'
            },

        ]
    },

    { //Quản lý lịch hẹn
        name: 'Quản lý lịch hẹn',
        menus: [

            {
                name: 'Quản lý lịch hẹn', link: '/system/manage-booking'
            },

        ]
    },
];

//Staff
export const staffMenu = [
    {
        name: 'Trang chủ',
        menus: [
            {
                name: 'Trang chủ', link: '/system/welcome'
            }
        ]
    },

    {
        name: 'Cá nhân',
        menus: [

            { //Quản lý kế hoạch làm việc

                name: 'Tạo lịch làm việc', link: '/staff/manage-schedule'
            },
            { //Quản lý lịch hẹn

                name: 'Xác nhận lịch hẹn', link: '/staff/manage-booking-customer'
            },

        ]
    }
];