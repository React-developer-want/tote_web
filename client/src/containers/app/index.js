import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { allRoutes } from './all-routes';
import Navbar from '../../components/navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const routes = allRoutes;

  return <BrowserRouter>
    <Navbar/>
    <ToastContainer/>
    <Routes>
      {routes.map(route => {
        return <Route key={route.path} exact={true} path={route.path} element={route.element}></Route>
      })}
    </Routes>
  </BrowserRouter>
}

export default App;
