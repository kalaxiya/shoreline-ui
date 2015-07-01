/**
 * Created by linzerui on 15/6/29.
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

class AppNav extends React.Component {
    render() {
        return (
            <nav className="nav">
                <h1><Link to="/">shoreline ui</Link></h1>
                <ul>
                    <li><Link to="get-started">Get Started</Link></li>
                    <li><Link to="components">Components</Link></li>
                </ul>
            </nav>
        )
    }
}

module.exports = AppNav;