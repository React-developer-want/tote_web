export const mapDepartmentsData = (data) => {
    return {
        metaData: {
            title: "Departments | TOTE"
        },
        mainSection: {
            search: {
                placeholder: "Search"
            },
            departmentsCards : data || []
        }
    }
}