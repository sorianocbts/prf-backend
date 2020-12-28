import { React } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './styles.css';
import MyNav from './components/MyNav';
import Logs from './components/Logs';
import LoginTab from './components/LoginTab';


const App = () => {
  return (
    <Router>
      <MyNav />
      <Switch>
        <Route exact path="/">
          <Logs />
        </Route>
        {/* <Route path="/about">
          <LoginTab />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App;
