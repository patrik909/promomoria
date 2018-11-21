import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Pages/Home.js';
import AddRelease from './Pages/AddRelease';
import ViewReleases from './Pages/ViewReleases.js';
import ReleasePage from './Pages/Release.js';

import './App.css';

const View = () => <ViewReleases />;
const Add = () => <AddRelease />;
const Release = ({ match }) => <ReleasePage match={match} />;

const Promomoria = () => (
    <Router>
        <div className="Promomoria">
            <Route exact path="/" component={Home} />
            <Route path="/Add" component={Add} />
            <Route path="/View" component={View} />
            <Route path="/Release/:id" component={Release} />
        </div>
    </Router>
);

export default Promomoria;