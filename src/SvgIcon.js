/**
 * Created by linzerui on 15/6/13.
 */

"use strict";

var React = require( "react" );
var assign = require( "object-assign" );

class SvgIcon extends React.Component {
    constructor( props ) {
        super( props );
    }

    getStyle() {
        return {
            display: "inline-block",
            width: 24,
            height: 24,
            userSelect: "none"
        };
    }

    render() {
        var style = assign( this.getStyle(), this.props.style );

        return (
            <svg viewBox="0 0 24 24" style={style}>
                {this.props.children}
            </svg>
        )
    }
}

module.exports = SvgIcon;