import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Routing from './route/routing';
import Home from './pages/home';
import { BrowserRouter, HashRouter } from 'react-router-dom';

function App() {

  return (
    <div className='container'>
      <Routing />
    </div>
  );
}

export default App;
