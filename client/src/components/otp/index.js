import { useState } from 'react';
import { ExclamationMark } from '../icons';

import './styles.scss';

const Otp = (props) => {
  const { onChange, isValid, ...rest } = props;
  const [isError, setIsError] = useState(false);

  const onChangeName = ({ target }) => {
    const isValid = target.value !== '';
    setIsError(!isValid);
    props.onChange(target.value, !!isValid);
  };

  const onBlurName = ({target}) => {
    const isValid = target.value !== '';
    setIsError(!isValid);
  }

  const onFocusName = () => {
    setIsError(false);
  }

  return <div className={`otp-component ${isError ? 'error' : ''}`}>
    <div className='otp-wrapper'>
      <div className="text">
        {props.label}
      </div>
      <input className='otp-input' type="text" maxLength={6} value={props.value} onBlur={onBlurName} onFocus={onFocusName} onChange={onChangeName} {...rest} />
      <div className="error-icon"> <ExclamationMark/> </div>
    </div>
  </div>
};

export default Otp;