import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Otp from '../../../components/otp';
import Button from '../../../components/button';
import { preSignupResendOTP, signup } from '../../../services/login/signup';
import { sendErrorNotification, sendSuccessNotification } from '../../../services/notifications';

const FormSection = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [[otp, isValidOTP], setOtp] = useState(['', false]);
  const [isResendOTP, setIsResendOTP] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(10);

  const onSubmitHandle = async (event) => {
    event.preventDefault();
    if(!isValidOTP){
      sendErrorNotification('Please provide a valid OTP');
      return;
    }
    const result = await signup(id, otp);
    if(result.status === 'success') {
      sendSuccessNotification('You have successfully created an account.');
      navigate('/login');
    }else{
      sendErrorNotification(result.message);
    }
  };

  const handleResentOTP = async () => {
    const result = await preSignupResendOTP(id);
    if(result.status === 'success'){
      sendSuccessNotification(result.message);
      setIsResendOTP(true);
      setTimeRemaining(10);
    }else{
      sendErrorNotification(result.message);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [timeRemaining]);

  useEffect(()=> {
    if(!isResendOTP) return;

    setTimeout(() => {
      setIsResendOTP(false); 
    }, 10*1000);
  },[isResendOTP])

  const formComponents = {
    otp: (key, props) => <Otp key={key} {...{...props, value: otp, onChange: (value, isValid) => setOtp([value, isValid])}} />,
    button: (key, props) => <Button className="signup" key={key} {...{ ...props }} />,
  };

  return <div className="form-section">
    <form onSubmit={onSubmitHandle}>
      {props.inputComponents.map(({ component, details }, index) => {
        const key = `form-component-${component}-${index}`;
        return formComponents[component](key, details);
      })}
    </form>
    <div className="resent-otp">
      {!isResendOTP ? 
        <span className='link' onClick={handleResentOTP}>Resend OTP</span>
        : <span className='text'>Resend OTP in {timeRemaining}s</span>}
    </div>
    <div className="bottom-text">
      {props.bottomText}
      <Link to={props.signUpLink}>{props.linkText}</Link>
    </div>
  </div>
};

export default FormSection;