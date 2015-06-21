/**
 * Created by linzerui on 15/6/16.
 */

/**
 * Usage:
 *
 * <Paper radius={20} />
 */

"use strict";

var React = require( "react" );
var mergeAndPrefix = require( "./functions/mergeAndPrefix" );
var hexToRgb = require( "./functions/hexToRgb" );

class Paper extends React.Component {
    getStyle() {
        var props = this.props;

        return {
            backgroundColor: hexToRgb( props.themeColor ),
            transition: props.transitionEnabled && "all 300ms ease",
            boxSizing: "border-box",
            boxShadow: this.getShadow( props.zDepth ),
            borderRadius: props.circle ? "50%" : props.radius
        }
    };

    getShadow( zDepth ) {
        var shadows = [
            '',
            '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
            '0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)',
            '0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23)',
            '0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22)',
            '0 19px 60px rgba(0, 0, 0, 0.30), 0 15px 20px rgba(0, 0, 0, 0.22)'
        ];

        return shadows[ zDepth ];
    }

    render() {
        var props = this.props;

        //`style.backgroundColor` can overwrite the `themeColor`
        var style = mergeAndPrefix( this.getStyle(), props.style );

        return (
            <div style={style}>
                {props.children}
            </div>
        );
    }
}

Paper.propTypes = {
    themeColor: React.PropTypes.string,
    circle: React.PropTypes.bool,
    radius: React.PropTypes.number,
    zDepth: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
    transitionEnabled: React.PropTypes.bool
};

Paper.defaultProps = {
    themeColor: "#9dbaef",
    circle: false,
    radius: 3,
    zDepth: 1,
    transitionEnabled: true
};

module.exports = Paper;
