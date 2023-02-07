import './App.css';
import {useState,useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TheLayout from './container/TheLayout';
import Home from "./views/Home";
import Login from './views/Login';
import SignUp from './views/SignUp';
import Layout2 from './container/Layout2';
import Dashboard from './views/Dashboard';
import Project from './views/Projects';
import Volunteer from './views/Volunteers';
import NGO from './views/Ngo';
import Logout from './views/Logout';


function App() {

  const [auth, setauth] = useState(true);
  const [auth1, setauth1] = useState(false);

  const isLoggedIn = async() => {
    try {
      const res = await fetch('/auth' , {
        method: 'GET',
        headers :{
          Accept :"application/json",
          "Content-Type" : "application/json"
        },
        credentials:"include",  
      });
      if(res === 200){
        setauth(true);
      }
      if(res === 401 || !res){
        setauth(false);
      }
    } catch (error) {
      
    }
  }

    useEffect(() => {
      isLoggedIn();
    }, [])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TheLayout><Home /></TheLayout>} />
        <Route path='/Login' element={<TheLayout><Login /></TheLayout>}/>
        <Route path='/SignUp' element={<TheLayout><SignUp /></TheLayout>} />
        <Route path='/Dashboard' element={auth ? <Layout2><Dashboard /></Layout2> : <Navigate to={'/'} />} />
        <Route path='/Projects' element={auth ? <Layout2><Project /></Layout2> : <Navigate to={'/'} />} />
        <Route path='/Volunteers' element={auth ? <Layout2><Volunteer /></Layout2> : <Navigate to={'/'} />} />
        <Route path='/Ngo' element={auth ? <Layout2><NGO /></Layout2> : <Navigate to={'/'} />} />
        <Route path='/Logout' element={auth ? <Layout2><Logout /></Layout2> : <Navigate to={'/'} />} />
      </Routes>
    </Router>
  );
}

export default App;
