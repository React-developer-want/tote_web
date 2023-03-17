import React from 'react';
import './style.scss';

const Modal = (props) => {
  return (
    <div className={'modal ' + props.className}>
        <div className="modal-container">
          <div className="modal-header">
              <header> {props.title} </header>
              <span className='close' onClick={props.onClickClose}>&times;</span>
          </div>
          <div className="modal-content">
              {props.children}
          </div>
        </div>
    </div>
  )
}

export default Modal
