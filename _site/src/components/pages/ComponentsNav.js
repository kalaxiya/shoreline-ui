/**
 * Created by linzerui on 15/6/29.
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

class ComponentsNav extends React.Component {
    render() {
        var list = this.props.items.map(function(v, i){
            return (
                <li key={i}>
                    <Link to={v.route}>{v.label}</Link>
                </li>
            )
        });

        return (
            <ul className="component-list">
                {list}
            </ul>
        );
    }
}

module.exports = ComponentsNav;