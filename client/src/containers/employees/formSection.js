import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../components/button';
import Dropdown from '../../components/dropdown';
import SimpleInput from '../../components/input';
import Loader from '../../components/loader';
import { sendErrorNotification, sendSuccessNotification } from '../../services/notifications';
import { deleteEmployee, getEmployeeDetailsById, updateEmployeeDetails } from '../../services/employees/employee-details';

const FormSection = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const employee = useSelector(state => state.employee.loggedInEmployee);
    const isUpdateOperation = employee?.role?.toLowerCase() === 'admin';

    const setEmployeeData = (data) => {
        setEmail(data?.email ?? '');
        setName(data?.name ?? '');
        setAddress(data?.address ?? '');
        setPhone(data?.phone ?? '');
        setRole(data?.role ?? 'agent');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const details = {
            name,
            phone,
            address,
            role,
        };
        const response = await updateEmployeeDetails(id, details);
        if(response.status === 'success'){
            sendSuccessNotification("Employee details has been updated");
        }else if(response.status === 'TokenExpiredError'){
            navigate('/login');
            sendErrorNotification('Session expired login again!')
        }else{
            sendErrorNotification(response?.message ?? "Server is not responding");
        }
    }

    const handleDelete = async () => {
        const response = await deleteEmployee(id);
        if(response.status === 'success'){
            navigate(-1);
            sendSuccessNotification(response.message);
        }else if(response.status === 'TokenExpiredError'){
            navigate('/login');
            sendErrorNotification('Session expired login again!')
        }else{
            sendErrorNotification(response?.message ?? "Server is not responding");
        }
    }


    useEffect(()=> {
        const getEmployeeToUpdate = async (id) => {
            setLoading(true);
            const response = await getEmployeeDetailsById(id);
            
            setEmployeeData(response?.body?.employee);
            setLoading(false);
        }
        getEmployeeToUpdate(id);
    },[id])

    const formComponents = {
        name: (key, props) => <SimpleInput key={key} {...{...props, value: name, onChange: (value) => setName(value) }}/>,
        phone: (key, props) => <SimpleInput key={key} {...{...props, value: phone, onChange: (value) => setPhone(value)}}/>,
        email: (key, props) => <SimpleInput key={key} {...{...props, value: email, onChange: (value) => setEmail(value)}}/>,
        address: (key, props) => <SimpleInput key={key} {...{...props, value: address, onChange: (value) => setAddress(value)}}/>,
        button: (key, props) => isUpdateOperation ? <Button key={key} {...{...props}}/> : null,
        deleteButton: (key, props) => isUpdateOperation ? <Button key={key} {...{...props, delete: true, onClickBtn:()=> handleDelete()}}/> : null,
        cancelButton: (key, props) => <Button key={key} {...{...props, cancel:true, onClickBtn:()=> navigate(-1)}}/>,
        dropdown: (key, props) => <Dropdown key={key} {...{...props, value:role, onChange: (value) => setRole(value)}}/>
    };

  return ( loading ? <Loader/> :
    <div className='formSection'>
      <form onSubmit={handleSubmit}>
        {props.inputComponents.map(({component, details}, index)=>{
            const key = `form-component-${component}-${index}`;
            return formComponents[component](key, details);
        })}
        <div className="buttons">
            {props.inputButtons.map(({component, details}, index)=>{
                const key = `form-component-${component}-${index}`;
                return formComponents[component](key, details);
            })}
        </div>
      </form>
    </div>
  )
}

export default FormSection