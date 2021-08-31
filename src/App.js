import React from 'react';
import Header from './Components/Header';
import Board from './Components/board/Board';
import GetStarted from './Components/GetStarted';
import About from './Components/About';
import Intro from './Components/Intro';
import LogIn from './Components/authentication/LogIn';
import { HashRouter, Route, Link, Switch, NavLink } from 'react-router-dom';
import NotFound from './Components/NotFound';

function App() {
    return (
        <>
            <HashRouter>
                <>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Intro}></Route>
                        <Route exact path='/board' component={Board}></Route>
                        <Route path='/getstarted' component={GetStarted}></Route>
                        <Route path='/info' component={About}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </>
            </HashRouter>
        </>
    );
}

export default App;
