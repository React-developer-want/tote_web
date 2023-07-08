import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import Email from '../../components/email';
import Password from '../../components/password';
import { signin } from '../../services/login/signin';
import { sendErrorNotification, sendInfoNotification, sendSuccessNotification } from '../../services/notifications';
import { checkAllTrue } from '../../utils/check-all';
import { setLocalStorageKey } from '../../utils/localStorage';

import './form-section.scss';

const handleLocalStorge = (tokenDetails, id, email) => {
  setLocalStorageKey('token', tokenDetails.token);
  setLocalStorageKey('expiry', tokenDetails.expiry);
  setLocalStorageKey('id', id);
  setLocalStorageKey('email', email);
}

const FormSection = (props) => {
  const navigate = useNavigate();
  const [[email, isEmailValid], setEmail] = useState(['', false]);
  const [[password, isPasswordValid], setPassword] = useState(['', false]);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    props.setIsLoading(true);
    if (!checkAllTrue([isEmailValid, isPasswordValid])) {
      sendInfoNotification('Form Incomplete: Please fill details below.');
      return;
    }
    try{
      const response = await signin(email, password);
      if(response.status === 'success'){
        handleLocalStorge(response.tokenDetails, response.body.employee._id, email);
        sendSuccessNotification('Welcome '+ response.body.employee.name);
        navigate('/');
      }else{
        sendErrorNotification(response.message);
      }
    }catch(error){
      sendErrorNotification(error.message);
    }
    props.setIsLoading(false);
  };

  const formComponents = {
    email: (key, props) => <Email key={key} {...{ ...props, value: email, onChange: (value, isValid) => setEmail([value, isValid]) }} />,
    password: (key, props) => <Password key={key} {...{ ...props, value: password, onChange: (value, isValid) => setPassword([value, isValid]) }} />,
    button: (key, props) => <Button className="login" key={key} {...{ ...props }} />,
    link: (key, props) => <Link key={key} className="signup-link" {...props}>{props.text}</Link>
  };

  return (
  <div className="form-section">
    <form onSubmit={onSubmitHandle}>
      {props.inputComponents.map(({ component, details }, index) => {
        const key = `form-component-${component}-${index}`;
        return formComponents[component](key, details);
      })}
    </form>
    <div className="bottom-text">
      {props.bottomText}
      <Link to={props.signUpLink}>{props.linkText}</Link>
    </div>
  </div>)
};

export default FormSection;