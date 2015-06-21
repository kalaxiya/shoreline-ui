/**
 * Created by linzerui on 15/6/13.
 */

/**
 * `CheckBox` 选中时的 `icon`
 */

"use strict";

var React = require( "react" );
var SvgIcon = require( "../SvgIcon" );

class CheckBoxIcon extends React.Component {
    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M10,17l-5-5l1.4-1.4 l3.6,3.6l7.6-7.6L19,8L10,17z"/>
            </SvgIcon>
        )
    }
}

module.exports = CheckBoxIcon;