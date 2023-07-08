export const mapNavbarData = (data)=>{
    return {
        header : 'Tote web',
        navbarItems : [
            {
                to: '/',
                paths: ['', '/'],
                title: 'Dashboard',
                icon: 'home_icon',
                id: 'navitem-1'
            },
            {
                to: '/employees',
                paths: ['/employees', '/employees/'],
                title: 'Employees',
                icon: 'employees_icon',
                id: 'navitem-2'
            },
            {
                to: '/departments',
                paths: ['/departments', '/departments/'],
                title: 'Departments',
                icon: 'departments_icon',
                id: 'navitem-3'
            },
            {
                to: '/projects',
                paths: ['/projects', '/projects/'],
                title: 'Projects',
                icon: 'projects_icon',
                id: 'navitem-4'
            },
            {
                to: '/tasks',
                paths: ['/tasks', '/tasks/'],
                title: 'Tasks',
                icon: 'tasks_icon',
                id: 'navitem-5'
            },
            {
                to: '/profile',
                paths: ['/profile', '/profile/'],
                title: 'Profile',
                icon: 'profile_icon',
                id: 'navitem-8'
            },
        ],
        employeeName: data?.name ?? '😎'
    }
}