import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { allRoutes } from './all-routes';
import Navbar from '../../components/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from '../../redux/store';
import Header from '../../components/header';

const App = () => {
  const routes = allRoutes;
  const { isActive, isHidden } = useSelector(state => state.navbar);

  return (
    <BrowserRouter>
      <Navbar/>
      <ToastContainer/>
      <div className={`main-container ${isHidden ? 'hidden' : ''} ${!isActive && !isHidden ? 'active': ''}`}>
        <Header/>
        <Routes>
          {routes.map(route => {
            return <Route key={route.path} exact={true} path={route.path} element={route.element}></Route>
          })}
        </Routes>
      </div>
    </BrowserRouter>
  )
};

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default AppWithStore;
