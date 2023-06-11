import { getProgressPercentage } from '../utils/date-handler';

export const mapDashboardData = (allCounts = {}, projects = []) => {
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
      projectsTitle: 'All Projects',
      projectsTable: {
        rowLabels: ['_id', 'project', 'manager', 'status', 'progress'],
        rows: projects?.map((item, index) => ({
          cells: [
            { value: index+1 },
            { value: item?.name ?? '-' },
            { value: item?.manager_name ?? '-' },
            { value: item?.status ?? '-' },
            { value: getProgressPercentage(item.start_date, item.due_date) + ' %' }
          ],
        })),
      },
    }
  }
}