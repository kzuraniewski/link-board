import React from 'react';
import Header from './Components/page/Header';
import Board from './Components/board/Board';
import About from './Components/page/About';
import Intro from './Components/page/Intro';
import NotFound from './Components/page/NotFound';
import { HashRouter, Route, Link, Switch, NavLink } from 'react-router-dom';

function App() {
    return (
        <>
            <HashRouter>
                <>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={Intro}></Route>
                        <Route exact path='/board' component={Board}></Route>
                        <Route path='/info' component={About}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </>
            </HashRouter>
        </>
    );
}

export default App;
