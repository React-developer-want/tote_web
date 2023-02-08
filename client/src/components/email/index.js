import { useState } from 'react';
import { validateEmail } from '../../utils/email-validator';
import { ExclamationMark } from '../icons';
import './styles.scss';

const Email = (props) => {
  const { onChange, isValid, ...rest } = props;
  const [isError, setIsError] = useState(false);

  const onChangeEmail = ({ target }) => {
    const isValid = validateEmail(target.value);
    setIsError(!isValid);
    props.onChange(target.value?.toLowerCase(), !!isValid);
  };

  const onBlurEmail = ({target}) => {
    const isValid = validateEmail(target.value);
    setIsError(!isValid);
  }

  const onFocusEmail = () => {
    setIsError(false);
  }

  return <div className={`email-component ${isError ? 'error' : ''}`}>
    <div className='email-wrapper'>
      <div className="text">
        {props.label}
      </div>
      <input className='email-input' type="email" value={props.value} onBlur={onBlurEmail} onFocus={onFocusEmail} onChange={onChangeEmail} {...rest} />
      <div className="error-icon"> <ExclamationMark/> </div>
    </div>
  </div>
};

export default Email;