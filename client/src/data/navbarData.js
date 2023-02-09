export const mapNavbarData = (data)=>{
    return {
        header : 'Tote web',
        navbarItems : [
            {
                to: '/',
                title: 'Dashboard',
                id: 'navitem-1'
            },
            {
                to: '/employees',
                title: 'Employees',
                id: 'navitem-2'
            },
            {
                to: '/departments',
                title: 'Departments',
                id: 'navitem-3'
            },
            {
                to: '/projects',
                title: 'Projects',
                id: 'navitem-4'
            },
            {
                to: '/tasks',
                title: 'Tasks',
                id: 'navitem-5'
            },
            {
                to: '/timesheets',
                title: 'Timesheets',
                id: 'navitem-6'
            },
            {
                to: '/reports',
                title: 'Reports',
                id: 'navitem-7'
            },
            {
                to: '/settings',
                title: 'Settings',
                id: 'navitem-7'
            },
            {
                to: '/profile',
                title: 'Profile',
                id: 'navitem-8'
            },
        ],
        employeeName: data?.name ?? '😎'
    }
}