/**
 * Created by linzerui on 15/6/23.
 */

'use strict';

var React = require( 'react' );
var Router = require( 'react-router' );
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Home = require( './components/Home' );
var Doc = require( './components/Doc' );

var routes = (
    <Route handler={App}>
        <Route path="/" handler={Home} />
        <Route path="/doc" name="doc" handler={Doc} />
    </Route>
);

class App extends React.Component {
    render() {
        return <RouteHandler />
    }
}

Router.run(routes, Router.HashLocation, (Root) => {
    React.render(<Root/>, document.body);
});