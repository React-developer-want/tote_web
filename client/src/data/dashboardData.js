
export const mapDashboardData = (allCounts = {}, employees = []) => {

  return {
    metaData: {
      title: "Dashboard | TOTE"
    },
    topSection: {
      allEntities: [
        {
          title: 'Total departments', count: allCounts?.departments || 0, link: '/departments'
        },
        {
          title: 'Total employees', count: allCounts?.employees || 0, link: '/employees'
        },
        {
          title: 'Total projects', count: allCounts?.projects || 0, link: '/projects'
        },
      ],
    },
    mainSection:{
      recentOrders : [
        {
          name: "Star Refrigerator", price: "$ 1200", payment: "Paid", status: "Delivered", statusStyle: "delivered",
        },
        {
          name: "Dell Laptop", price: "$ 110", payment: "Due", status: "Pending", statusStyle: "pending",
        },
        {
          name: "Apple Watch", price: "$ 1200", payment: "Paid", status: "Return", statusStyle: "return",
        },
        {
          name: "Addidas Shoes", price: "$ 620", payment: "Due", status: "In Progress", statusStyle: "inProgress",
        },
        {
          name: "Start Refrigerator", price: "$ 1200", payment: "Paid", status: "Delivered", statusStyle: "delivered",
        },
        {
          name: "Dell Laptop", price: "$ 110", payment: "Due", status: "Pending", statusStyle: "pending",
        },
        {
          name: "Apple Watch", price: "$ 1200", payment: "Paid", status: "Return", statusStyle: "return",
        },
        {
          name: "Addidas Shoes", price: "$ 620", payment: "Due", status: "In Progress", statusStyle: "inProgress",
        },
      ],
      recentCustomers: employees?.map((employee)=> ({
        id: employee?._id,
        name: employee?.name,
        email: employee?.email
      })) || [],
    }
  }
}