/**
 * Created by linzerui on 15/6/29.
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var AppNav = require('./pages/AppNav');

class Master extends React.Component {
    _handleCtrl(e) {
        e.preventDefault();
        document.body.classList.toggle( 'shoreline' );
    }

    render() {
        return (
            <div className="app">
                <a href="#" className="ctrl" onClick={this._handleCtrl}>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
                <AppNav />
                <div className="content">
                    <div className="inner">
                        <RouteHandler />
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Master;