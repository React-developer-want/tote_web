import React from 'react';

const EntityPairs = (props) => (
  <div className="entity-pairs">
    <span className='key'>{props.title}</span>
    <span className="value">{props.value}</span>
  </div>
);

const ProjectComponent = (props) => (
  <div className="project-card">
    <div className="title">{props?.title}</div>
    {props.list.length > 0 ? <div className="grid">
      {props?.list?.map((item, index)=> (
        <div className="container" key={item?.name+index}>
          <img src="/assests/project.jpg" alt="project" />
          <div className="details">
            <div className="name">{item?.name}</div>
            <EntityPairs title="Start date" value={new Date(item?.start_date).toDateString()}/>
            <EntityPairs title="Due date" value={new Date(item?.due_date).toDateString()}/>
          </div>
          <div className="flag">{item?.status}</div>
        </div>
      ))}
    </div> : (
    <div className="no-data">
      No Data to Show
    </div>
    )}
  </div>
);

const MainSection = (props) => {
  const { activeProjectsList, completedProjectsList, rejectedProjectsList } = props;
  
  return (
    <div className='projects-main-section'>
      <ProjectComponent title="Active Projects" list={activeProjectsList} />
      <ProjectComponent title="Completed Projects" list={completedProjectsList} />
      <ProjectComponent title="Rejected Projects" list={rejectedProjectsList} />
    </div>
  )
}

export default MainSection;
