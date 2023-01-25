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


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TheLayout><Home/></TheLayout>}/>
        <Route path='/Login' element={<TheLayout><Login/></TheLayout>}/>
      </Routes>
    </Router>
  );
}

export default App;
