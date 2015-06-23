/**
 * Created by linzerui on 15/6/13.
 */

/**
 * `CheckBox` 的 `outline`
 */

'use strict';

var React = require( 'react' );
var SvgIcon = require( '../SvgIcon' );

class CheckBoxIconOutline extends React.Component {
    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z"/>
            </SvgIcon>
        )
    }
}

module.exports = CheckBoxIconOutline;