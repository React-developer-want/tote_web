export const mapProfileData = (data = {}) => {
    return {
        metaData: {
            title: "Profile | TOTE"
        },
        mainSection: {
            userDetails: [
                {
                    field: "full name", value: data?.name || '' 
                },
                {
                    field: "email id", value: data?.email || '' 
                },
                {
                    field: "phone number", value: data?.phone || '' 
                },
                {
                    field: "address", value: data?.address || '' 
                },
                {
                    field: "organization role", value: data?.role || '' 
                }
            ]
        }
    }
}