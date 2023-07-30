
import MetaTags from '../../../components/meta-tags';
import otpVerificationData from '../../../data/signup-data/otp-verification.json';
import TopSection from '../top-section';
import FormSection from './form-section';

import '../styles.scss';

const OTP_VERIFICATION = () => {
  const { topSection, formSection, metaData } = otpVerificationData;

  return <div className="signup-page">
    <div className="signup-container">
      <MetaTags {...metaData} />
      <TopSection {...topSection} />
      <FormSection {...formSection} />
    </div>
  </div>
};

export default OTP_VERIFICATION;