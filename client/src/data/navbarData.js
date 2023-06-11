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
                to: '/profile',
                title: 'Profile',
                id: 'navitem-8'
            },
        ],
        employeeName: data?.name ?? '😎'
    }
}