/**
 * Created by linzerui on 15/6/23.
 */

'use strict';

var React = require( 'react' );
var Router = require( 'react-router' );
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

class Doc extends React.Component {
    render() {
        return (
            <div>
                <h1>Doc</h1>
            </div>
        )
    }
}

module.exports = Doc;