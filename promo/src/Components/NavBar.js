import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <div>
                <h1>Promomoria</h1>
                <Link to="/Add">Add</Link>
                <Link to="/View">View</Link>
            </div>
            <div className="underline"></div>
        </nav>
    );
}

export default NavBar;