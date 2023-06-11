import React, { useEffect, useState } from 'react';
import { mapNewTaskData } from '../../data/newTaskForm';
import { getAllEmployees } from '../../services/employees/allEmployees';
import { getLocalStorageKey } from '../../utils/localStorage';
import FormCard from './form-card';
import Button from '../../components/button';
import { createTask } from '../../services/tasks/tasks';
import { sendErrorNotification, sendSuccessNotification } from '../../services/notifications';

const NewTaskForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [{ allFields }, setNewTaskData] = useState(mapNewTaskData([], props.status));

  useEffect(()=> {
    const syncRequiredData = async () => {
      setIsLoading(true);
      const allEmployees = await getAllEmployees();
      setNewTaskData(mapNewTaskData(allEmployees.body.data, props.status));
      setIsLoading(false);
    }
    syncRequiredData();
  }, []);

  const handleSubmit = async () => {
    const [title, start_date, due_date, status, assigned_to] = allFields.map((item)=> item.value);
    const details = {
      title, start_date, due_date, status, assigned_to, assigned_by: getLocalStorageKey('id')
    };
    setIsLoading(true);
    const result = await createTask(details);
    if(result.status === 'success'){
      sendSuccessNotification('The task has been created successfully');
      props.closeModal();
      props.fetchTasks();
    }else{
      sendErrorNotification(result.message);
    }
    setIsLoading(false);
  }

  const formItems = allFields?.map((item, index) => ({
    label: item.label,
    value: item.value,
    type: item.type,
    ...item.details,
    onChange: ({ target: { value } }) => {
      const list = allFields.map((item)=> item);
      list[index].value = value;
      setNewTaskData((prev)=> ({
        ...prev, 
        allFields: list
      }));
    }
  }));

  return (
    <div className='task-details-form'>
      <FormCard items={formItems} />
      <div className="task-details-btns">
        <Button text="Cancel" onClickBtn={props.closeModal}/>
        <Button 
          text={isLoading ? "...Loading" : "Save Changes" }
          button="primary" 
          onClickBtn={handleSubmit}
        />
      </div>
    </div>
  )
}

export default NewTaskForm
