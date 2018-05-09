import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import * as ReactBootstrap from "react-bootstrap";

class App extends Component {
  render() {
    return <div className="App">
        <header>
          <nav>
            <ReactBootstrap.Navbar>
              <ReactBootstrap.Navbar.Header>
                <ReactBootstrap.Navbar.Brand>
                  <Link to="/">Bloc Jams</Link>
                </ReactBootstrap.Navbar.Brand>
              </ReactBootstrap.Navbar.Header>
              <ReactBootstrap.Nav>
                <ReactBootstrap.NavItem eventKey={1}>
                  <Link to="/">Home</Link>
                </ReactBootstrap.NavItem>
              </ReactBootstrap.Nav>
              <ReactBootstrap.Nav>
                <ReactBootstrap.NavItem eventKey={2}>
                  <Link to="/library">Library</Link>
                </ReactBootstrap.NavItem>
              </ReactBootstrap.Nav>
            </ReactBootstrap.Navbar>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>;  
  }
}

export default App;
