import { useState } from 'react';
import { OpenEyeIcon, CloseEyeIcon, ExclamationMark } from '../icons';
import './styles.scss';

const Password = (props) => {
  const [isError, setIsError] = useState(false);
  const [showPwd,setShowPwd] = useState(false);
  const { onChange, ...rest } = props;
  
  const onChangePassword = ({ target }) => {
    const isValid = target.value !== '';
    props.onChange(target.value, isValid);
  }

  const onBlurPassword = ({target}) => {
    const isValid = target.value !== '';
    setIsError(!isValid);
  }

  const onFocusPassword = () => {
    setIsError(false);
  }

  const handleShowPwd = () => {
    setShowPwd((prev)=> !prev);
  }

  return <div className={`password-component ${isError ? 'error' : ''}`}>
    <div className="password-wrapper">
      <div className="text">{props.label}</div>
      <input className="password-input" type={showPwd ? "text" : "password"} value={props.value} onFocus={onFocusPassword} onBlur={onBlurPassword} onChange={onChangePassword} {...rest} />
      <div className="error-icon"> <ExclamationMark/> </div>
      <div className="show-password" onClick={handleShowPwd}>
        {showPwd ? <CloseEyeIcon/> : <OpenEyeIcon/>}
      </div>
    </div>
  </div>
};

export default Password;