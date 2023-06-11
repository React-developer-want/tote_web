
export const mapEmployeesData = (data=[])=>{
    return {
      metaData: {
        title: "Employees | TOTE"
      },
      mainSection:{

        employeesTable: {
          isFilters: true,
          isPagination: true,
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