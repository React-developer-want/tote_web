import React, { useState } from 'react'
import Button from '../../components/button'
import SimpleInput from '../../components/input'
import { createDepartment } from '../../services/departments/departments';
import { sendErrorNotification, sendSuccessNotification } from '../../services/notifications';
import { checkAllTrue } from '../../utils/check-all';
import './create-depart.scss';

const CreateDepartForm = (props) => {
    const [[name, isNameValid], setName] = useState(['', false]);
    const [[url, isUrlValid], setURL] = useState(['', false]);

    const handleSubmit = async (e)=> {
        e.preventDefault();
        if(!checkAllTrue([isNameValid, isUrlValid])){
            sendErrorNotification("Please fill the details");
            return;
        }
        const details = {title: name, url};
        const response = await createDepartment(details);
        if(response.status === 'success'){
            sendSuccessNotification("Successfully created a new department");
            props.closeModal();
            props.fetchData();
        }else{
           sendErrorNotification(response.message);
        }
    }

    const formComponents = {
        name: (key, props) => <SimpleInput
            {...props} key={key}
            value={name} onChange={(value)=> setName([value, !!value])}
        />,
        url: (key, props) => <SimpleInput
            {...props} key={key}
            value={url} onChange={(value) => setURL([value, !!value])}
        />,
        button: (key, props) => <Button
            {...props} key={key}
        />
    }
  return (
    <div className='create-department-formSection'>
        <form onSubmit={handleSubmit}>
            {props.inputComponents.map(({component, details}, index) => {
                const key = `create-depart-form ${index}`;
                return formComponents[component](key, details);
            })}
        </form>
    </div>
  )
}

export default CreateDepartForm
