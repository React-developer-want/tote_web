import { useState } from 'react';
import { ExclamationMark } from '../icons';

import './styles.scss';

const Name = (props) => {
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

  return <div className={`name-component ${isError ? 'error' : ''}`}>
    <div className='name-wrapper'>
      <div className="text">
        {props.label}
      </div>
      <input className='name-input' type="text" value={props.value} onBlur={onBlurName} onFocus={onFocusName} onChange={onChangeName} {...rest} />
      <div className="error-icon"> <ExclamationMark/> </div>
    </div>
  </div>
};

export default Name;