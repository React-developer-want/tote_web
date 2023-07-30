import MetaTags from '../../../components/meta-tags';
import preSignupData from '../../../data/signup-data/signup.json';
import TopSection from '../top-section';
import FormSection from './form-section';

import '../styles.scss';

const Signup = () => {
  const { formSection, metaData, topSection } = preSignupData;

  return <div className="signup-page">
    <div className="signup-container">
      <MetaTags {...metaData} />
      <TopSection {...topSection} />
      <FormSection {...formSection} />
    </div>
  </div>
};

export default Signup;