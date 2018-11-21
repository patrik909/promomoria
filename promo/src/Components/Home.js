import React from 'react';
import NavBar from './NavBar.js'

function Home(props) {

    const labelName = props.userData[0].label_name;

    return (
        <div className="Home">
            <NavBar />
            <main>
                <h2>welcome,<br /><span>{labelName}</span>
                </h2>
            </main>
        </div>
    );
}

export default Home;