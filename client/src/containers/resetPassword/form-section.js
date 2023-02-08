import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import Email from '../../components/email';
import Otp from '../../components/otp';
import Password from '../../components/password';
import { forgotPassword } from '../../services/login/forgotpassword';
import { resetPassword } from '../../services/login/resetpassword';
import { sendErrorNotification, sendInfoNotification, sendSuccessNotification } from '../../services/notifications';
import { checkAllTrue } from '../../utils/check-all';

import './form-section.scss';

const FormSection = (props) => {
  const navigate = useNavigate();
  const [[email, isEmailValid], setEmail] = useState(['', false]);
  const [[password, isPasswordValid], setPassword] = useState(['', false]);
  const [[otp, isOtpValid], setOtp] = useState(['', false]);
  const [isOtpScreenActive, setOtpScreenActive] = useState(false);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    if(!isOtpScreenActive){
      if (!checkAllTrue([isEmailValid])) {
        sendErrorNotification('Please fill details below.');
        return;
      }
      try{
        sendInfoNotification("We are sending OTP on your email!");
        const response = await forgotPassword(email);
        if(response.status === 'success'){
          sendSuccessNotification("OTP has been successfully sent!");
          setOtpScreenActive(true);
        }else{
          sendErrorNotification(response.message);
        }
      }catch(error){
        sendErrorNotification(error.message);
      }
      
    }else{
      if(!checkAllTrue([isPasswordValid, isOtpValid])){
        sendErrorNotification('Please fill details below.');
        return;
      }
      try{
        sendInfoNotification("We are validating your OTP!")
        const response = await resetPassword(email, otp, password);
        if(response.status === 'success'){
          sendSuccessNotification('Password has been successfully changed!');
          navigate('/login');
        }else{
          sendErrorNotification(response.message);
        }       
      }catch(error){
        sendErrorNotification(error.message);
      }
    }
  };

  const formComponents = {
    otp: (key, props) => <Otp key={key} {...{...props, value: otp, onChange: (value, isValid) => setOtp([value, isValid])}} />,
    email: (key, props) => <Email key={key} {...{ ...props, value: email, onChange: (value, isValid) => setEmail([value, isValid]) }} />,
    password: (key, props) => <Password key={key} {...{ ...props, value: password, onChange: (value, isValid) => setPassword([value, isValid]) }} />,
    button: (key, props) => <Button className="login" key={key} {...{ ...props }} />,
    link: (key, props) => <Link key={key} className="signup-link" {...props}>{props.text}</Link>
  };

  return <div className="form-section">
    <form onSubmit={onSubmitHandle}>
      {(isOtpScreenActive ? props.otpComponents : props.inputComponents ).map(({ component, details }, index) => {
        const key = `form-component-${component}-${index}`;
        return formComponents[component](key, details);
      })}
    </form>
    <div className="bottom-text">
      <Link to={props.signInLink}>{props.linkText}</Link>
    </div>
  </div>
};

export default FormSection;