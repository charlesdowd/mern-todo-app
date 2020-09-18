import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './components/Nav'
import ToDoList from './components/ToDoList'
import EditToDo from './components/EditToDo'
import CreateToDo from './components/CreateToDo'

function App() {
  return (
    <Router>
      <Nav />
      
      <Switch>
      <Route exact path='/'><ToDoList /></Route>
      <Route path='/edit/:id'><EditToDo /></Route>
      <Route path='/create'><CreateToDo /></Route>
      </Switch>  
    </Router>
  );
}

export default App;
