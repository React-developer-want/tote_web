import './top-section.scss';

const TopSection = (props) => {
  return <div className="login-top">
    <div className="main-title">{props.title}</div>
  </div>
};

export default TopSection;