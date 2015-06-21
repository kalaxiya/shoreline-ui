/**
 * Created by linzerui on 15/6/16.
 */

"use strict";

var React = require( "react" );
var SvgIcon = require( "../SvgIcon" );

class RadioButtonOff extends React.Component {
    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            </SvgIcon>
        )
    }
}

module.exports = RadioButtonOff;