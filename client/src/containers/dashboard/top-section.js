import React from 'react';
import Card from '../../components/card';

const TopSection = (props) => {
  return (
    <div className='top-section'>
      {props.allEntities.map((entity, index) => (
        <Card key={entity.title+index} title={entity.title} onClick={()=> props.navigate(`${entity.link}`)}>
          {entity.count}
        </Card>
      ))}
    </div>
  )
}

export default TopSection;
