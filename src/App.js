import React from 'react';
import Header from './Components/Header';
import Board from './Components/Board';
import GetStarted from './Components/GetStarted';
import About from './Components/About';
import Intro from './Components/Intro';
import { HashRouter, Route, Link, Switch, NavLink } from 'react-router-dom';
import NotFound from './Components/NotFound';
import { MDBContainer } from 'mdb-react-ui-kit';

function App() {
    return (
        <>
            <HashRouter>
                <>
                    <Header />
                    <MDBContainer>
                        <Switch>
                            <Route exact path='/' component={Intro}></Route>
                            <Route exact path='/board' component={Board}></Route>
                            <Route path='/getstarted' component={GetStarted}></Route>
                            <Route path='/info' component={About}></Route>
                            <Route component={NotFound}></Route>
                        </Switch>
                    </MDBContainer>
                </>
            </HashRouter>
        </>
    );
}

export default App;
