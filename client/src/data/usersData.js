
export const mapUsersData = (data=[])=>{
    return {
      metaData: {
        title: "Users | TOTE"
      },
      mainSection:{

        usersTable: {
          rowLabels: ['Full Name', 'Email id', 'Phone Number', 'Address', 'Role', 'Action'],
          rows: data?.map((item) => ({
            action: 'Update',
            id: item?._id,
            cells: [
              { value: item?.name ?? '-' },
              { value: item?.email ?? '-' },
              { value: item?.phone ?? '-' },
              { value: item?.address ?? '-' },
              { value: item?.role ?? '-' },
            ],
          })),
        },
      }
    }
}