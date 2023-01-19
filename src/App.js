
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' name="Home" render></Route>
      </Switch>
    </Router>
  );
}

export default App;
