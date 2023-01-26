import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate ,
} from "react-router-dom";
import TheLayout from './container/TheLayout';
import Home from "./views/Home";
import Login from './views/Login';
import SignUp from './views/SignUp';
import Layout2 from './container/Layout2';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TheLayout><Home/></TheLayout>}/>
        <Route path='/Login' element={<TheLayout><Login/></TheLayout>}/>
        <Route path='/SignUp' element={<TheLayout><SignUp/></TheLayout>}/>
        <Route path='/Dashboard' element={<Layout2><Dashboard/></Layout2>}/>
      </Routes>
    </Router>
  );
}

export default App;
