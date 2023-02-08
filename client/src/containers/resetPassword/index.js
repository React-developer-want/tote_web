import React from 'react';
import MetaTags from '../../components/meta-tags';
import TopSection from './top-sections';
import FormSection from './form-section';

import './styles.scss';

const ResetPassword = (props) => {
    return <div className="resetPassword-page">
    <div className="resetPassword-container">
      <MetaTags {...props.metaData} />
      <TopSection {...props.topSection} />
      <FormSection {...props.formSection} />
    </div>
  </div>
}

export default ResetPassword
