import { Helmet } from 'react-helmet';

const MetaTags = (props) => {
  return <Helmet>
    <title>{props.title}</title>
  </Helmet>
};

export default MetaTags;