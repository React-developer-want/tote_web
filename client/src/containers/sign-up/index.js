import TopSection from "./top-section";
import MetaTags from "../../components/meta-tags";
import FormSection from "./form-section";

import './styles.scss';

const Signup = (props) => {
  return <div className="signup-page">
    <div className="signup-container">
      <MetaTags {...props.metaData} />
      <TopSection {...props.topSection} />
      <FormSection {...props.formSection} />
    </div>
  </div>
};

export default Signup;