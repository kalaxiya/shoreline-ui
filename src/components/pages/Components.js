/**
 * Created by linzerui on 15/6/23.
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var ComponentsNav = require('./ComponentsNav');

class Components extends React.Component {
    render() {
        var items = [
            {route: 'slider', label: 'Slider'},
            {route: 'tabs', label: 'Tabs'}
        ];

        return (
            <div>
                <ComponentsNav items={items} />
                <div className="main">
                    <RouteHandler />
                </div>
            </div>
        )
    }
}

module.exports = Components;