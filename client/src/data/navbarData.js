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
                to: '/ledger',
                title: 'Ledger',
                id: 'navitem-2'
            },
            {
                to: '/investments',
                title: 'Investments',
                id: 'navitem-3'
            },
            {
                to: '/users',
                title: 'Users',
                id: 'navitem-3'
            },
            {
                to: '/plans',
                title: 'Plans',
                id: 'navitem-3'
            },
        ],
        username: data?.name ?? '😎'
    }
}