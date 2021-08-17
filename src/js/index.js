import '../scss/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Content from './components/Content';

function App() {
    return (
        <>
            <Navbar />
            <Content />
        </>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));
