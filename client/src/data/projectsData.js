export const mapProjectsData = (projects = []) => {
  return {
    metaData: {
        title: "Projects | TOTE"
    },
    mainSection: {
      activeProjectsList: projects?.filter((project) => project.status === 'active') || [],
      completedProjectsList: projects?.filter((project) => project.status === 'completed') || [],
      rejectedProjectsList: projects?.filter((project) => project.status === 'completed') || [],
    }
  }
};