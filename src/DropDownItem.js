/**
 * Created by linzerui on 15/6/17.
 */

'use strict';

var React = require( 'react' );
var mergeAndPrefix = require( './functions/mergeAndPrefix' );

class DropDownItem extends React.Component {
    _handleClick() {
        this.props.onClick();
    }

    _handleMouseOver() {
        this.props.onMouseOver();
    }

    render() {
        var props = this.props;

        var style = {
            padding: '0 30px'
        };

        return (
            <div
                style={mergeAndPrefix( style, props.hoverStyle, props.selectedStyle )}
                onClick={this._handleClick.bind(this)}
                onMouseOver={this._handleMouseOver.bind(this)}
                >
                {props.children}
            </div>
        )
    }
}

module.exports = DropDownItem;