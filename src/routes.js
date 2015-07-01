/**
 * Created by linzerui on 15/6/29.
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./components/Master');
var Home = require('./components/pages/Home');
var GetStarted = require('./components/pages/GetStarted');
var Components = require('./components/pages/Components');

var Tabs = require('./components/pages/components/Tabs');
var Slider = require('./components/pages/components/Slider');

var AppRoutes = (
    <Route name="root" path="/" handler={Master}>
        <Route name="home" handler={Home} />
        <Route name="get-started" handler={GetStarted} />
        <Route name="components" handler={Components}>
            <Route name="tabs" handler={Tabs} />
            <Route name="slider" handler={Slider} />
            <Redirect from="/components" to="tabs" />
        </Route>

        <DefaultRoute handler={Home} />
    </Route>
);

module.exports = AppRoutes;
