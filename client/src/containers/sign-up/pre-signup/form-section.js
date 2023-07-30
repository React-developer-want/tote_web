import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { preSignup } from '../../../services/login/signup';
import { checkAllTrue } from '../../../utils/check-all';
import { sendErrorNotification, sendSuccessNotification } from '../../../services/notifications';
import Email from '../../../components/email';
import Password from '../../../components/password';
import Name from '../../../components/name';
import Button from '../../../components/button';

const FormSection = (props) => {
  const navigate = useNavigate();
  const [[name, isNameValid], setName] = useState(['', false]);
  const [[email, isEmailValid], setEmail] = useState(['', false]);
  const [[password, isPasswordValid], setPassword] = useState(['', false]);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    if (!checkAllTrue([isEmailValid, isPasswordValid, isNameValid])) {
      sendErrorNotification('Form Incomplete - Please fill details below.');
      return;
    }
    const result = await preSignup(name, email, password);
    if(result.status === 'success') {
      sendSuccessNotification(result.message);
      const { id } = result.response;
      navigate(`/otp-verification/${id}`);
    }else{
      sendErrorNotification(result.message);
    }
    
  };

  const formComponents = {
    email: (key, props) => <Email key={key} {...{ ...props, value: email, onChange: (value, isValid) => setEmail([value, isValid]) }} />,
    password: (key, props) => <Password key={key} {...{ ...props, value: password, onChange: (value, isValid) => setPassword([value, isValid]) }} />,
    name: (key, props) => <Name key={key} {...{ ...props, value: name, onChange: (value, isValid) => setName([value, isValid]) }} />,
    button: (key, props) => <Button className="signup" key={key} {...{ ...props }} />,
    link: (key, props) => <Link key={key} className="signin-link" {...props}>{props.text}</Link>
  };

  return <div className="form-section">
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
  </div>
};

export default FormSection;