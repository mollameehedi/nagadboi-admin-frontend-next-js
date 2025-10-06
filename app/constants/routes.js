
export const AppRoutes = {

  HOME: {
    path: '/',
    label: 'Home Page',
  },

  // admin route here
  admin: {
    dashboard: {
      path: '/admin/dashboard',
      label: 'Dashboard',
    },
    category: {
      index: {
        path: '/admin/category',
        label: 'All Category',
      },
      create: {
        path: '/admin/category/create',
        label: 'Category Create',
      },
    },
    customer: {
      index: {
        path: '/admin/customer',
        label: 'All customer',
      },
    },
    // user route start here
    user: {
      index: {
        path: '/admin/user-management/user',
        label: 'All User',
      },
      create: {
        path: '/admin/user-management/user/create',
        label: 'User Create',
      },
      show: (id) => ({
        path: `/admin/user/${id}`,
        label: 'User Details',
      }),
      edit: (id) => ({
        path: `/admin/user/${id}/edit`,
        label: 'User Edit',
      }),
    },
// user route end here
role: {
      index: {
        path: '/admin/user-management/role',
        label: 'All Role',
      },
      create: {
        path: '/admin/user-management/role/create',
        label: 'Role Create',
      },
    },



  },
};