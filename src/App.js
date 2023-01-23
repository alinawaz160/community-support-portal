import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import Container from './container/TheLayout';
import Home from "./views/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Container><Home/></Container>}/>
        {/* <Route path='/Dashboard' element={<Container><Dashboard/></Container>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
