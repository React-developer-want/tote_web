import React, { useState } from 'react'
import { mapTaskDetails } from '../../data/taskDetails';
import FormCard from './form-card';
import Button from '../../components/button';

const TaskDetailsForm = (props) => {
  const [{ allFields, initialState }, setTaskDetails] = useState(mapTaskDetails(props.details));

  const formItems = allFields?.map((item, index) => ({
    label: item.label,
    value: item.value,
    type: item.type,
    ...item.details,
    onChange: ({ target: { value } }) => {
      const list = allFields.map((item)=> item);
      list[index].value = value;
      setTaskDetails({ allFields: list });
    }
  }));

  return (
    <div className='task-details-form'>
      <FormCard items={formItems} />
      <div className="task-details-btns">
        <Button text="Cancel" onClickBtn={props.closeModal}/>
        <Button text="Save Changes" button="primary"/>
      </div>
    </div>
  )
}

export default TaskDetailsForm
