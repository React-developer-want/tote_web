import { useState } from "react";
import TopSection from "./top-section";
import MetaTags from "../../components/meta-tags";
import FormSection from "./form-section";
import Loader from '../../components/loader';
import './styles.scss';

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  return ( isLoading ? <Loader/> :
  <div className="login-page">
    <div className="login-container">
      <MetaTags {...props.metaData} />
      <TopSection {...props.topSection} />
      <FormSection {...props.formSection} setIsLoading={setIsLoading} />
    </div>
  </div>)
};

export default Login;