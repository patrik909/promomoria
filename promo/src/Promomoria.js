import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Start from './Pages/Start.js';

// import AddRelease from './Pages/AddRelease';
// import ViewReleases from './Pages/ViewReleases.js';
// import ReleasePage from './Pages/Release.js';

// const Feedback = ({ match }) => <ViewReleases match={match} />;
// const Release = ({ match }) => <ReleasePage match={match} />;

class Promomoria extends Component {

  state = {
    loggedInUser: [{
      // this is a placeholder
      id: 12,
      label_name: "Arsenik Records"
    }]
  }

  // handleLogin = user => {
  //   this.setState({loggedInUser: user})
  // }

  render() {
    return (
      <Router>
        <div className="Promomoria">
          <Route exact path="/" component={() => <Start user={this.state.loggedInUser} handleLogin={this.handleLogin} /> } />
          {/* <Route path="/Add" component={() => <AddRelease user={this.state.loggedInUser} /> } />
          <Route path="/ViewReleases/:id" component={Feedback} />
          <Route path="/Release/:id" component={Release} /> */}
        </div>
      </Router>
    );
  }
}

export default Promomoria;