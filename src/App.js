import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BlogNavbar from './BlogNavbar.js';
import BlogRegister from './BlogRegister.js';
import BlogLogin from './BlogLogin.js';
import BlogProfile from './BlogProfile.js';
import BlogMemberList from './BlogMemberList.js';
import BlogPost from './BlogPost.js';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class App extends React.Component {
   render () {
      let token = localStorage.getItem('token');
      let home_page;
      if (token)
        home_page=<Jumbotron><BlogPost></BlogPost></Jumbotron>;
      else
        home_page=<Jumbotron>
        <h1>Welcome on Microblogos,</h1>
        <p>
          Wonderful blog on any subjects!<br/> 
        </p>
        <p>
          <Button variant="primary" as={Link} to="/login">Log</Button>
          &nbsp;&nbsp;or&nbsp;&nbsp;
          <Button variant="primary" as={Link} to="/register">Register</Button>
          &nbsp;&nbsp;to post your messages !
        </p>
      </Jumbotron>;
      return (
    <Router>
      <div>
        <BlogNavbar token={token}></BlogNavbar>
        <Switch>
          <Route path="/register">
            <BlogRegister></BlogRegister>
          </Route>
          <Route path="/profile">
            <BlogProfile></BlogProfile>
          </Route>
          <Route path="/login">
            <BlogLogin></BlogLogin>
          </Route>
          <Route path="/member/list">
          <Jumbotron><BlogMemberList></BlogMemberList></Jumbotron>
          </Route>
          <Route path="/">
            {home_page}
          </Route>
        </Switch>
      </div>
    </Router>
  );}
}

export default App;
