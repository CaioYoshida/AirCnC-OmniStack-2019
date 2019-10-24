//Route pages
import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import New from './pages/New'
import Update from './pages/Update'

//<Switch> makes <BrowserRouer> render one page each time
//"path" represents the route of each frontend application

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component = {Login} />
                <Route path="/dashboard" component = {Dashboard} />
                <Route path="/new" component = {New} />
                <Route path="/update/:id" component = {Update} />
            </Switch>
        </BrowserRouter>
    )
}