import Loaders from 'react-js-loader';
import './styles.scss';

const Loader = ()=>{
    return <div className='loader-component'>
        <Loaders type="spinner-cub" bgColor={"#03a9f4"} color={'#03a9f4'} size={100} />
    </div>
}

export default Loader;