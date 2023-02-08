import TopSection from "./top-section";
import MetaTags from "../../components/meta-tags";
import FormSection from "./form-section";

import './styles.scss';

const Login = (props) => {
  return <div className="login-page">
    <div className="login-container">
      <MetaTags {...props.metaData} />
      <TopSection {...props.topSection} />
      <FormSection {...props.formSection} />
    </div>
  </div>
};

export default Login;