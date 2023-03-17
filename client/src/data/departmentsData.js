export const mapDepartmentsData = (data = []) => {
    return {
        metaData: {
            title: "Departments | TOTE"
        },
        mainSection: {
            filter: {
                search: {
                    placeholder: "Search department"
                },
                button: {
                    text: "Create Department"
                }
            },
            createDepartForm: [
                {
                    component: "name",
                    details: {
                        label: "Department name",
                        type: "text",
                        placeholder: "Enter department name",
                        required: true
                    }
                },
                {
                    component: "url",
                    details: {
                        label: "Website url",
                        type: "url",
                        placeholder: "Enter website url",
                        required: true
                    }
                },
                {
                    component: "button",
                    details: {
                        text: "create department",
                        type: "submit",
                        button: "primary"
                    }
                }
            ],
            departmentsCards : data || []
        }
    }
}