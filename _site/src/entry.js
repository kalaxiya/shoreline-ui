/**
 * Created by linzerui on 15/6/23.
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var AppRoutes = require('./routes');

Router
    .create({
        routes: AppRoutes,
        scrollBehavior: Router.ScrollToTopBehavior
    })
    .run(function(Handler){
        React.render(<Handler />, document.body);
    });