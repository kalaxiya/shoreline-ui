/**
 * Created by linzerui on 15/5/7.
 */

/**
 * Usage:
 *
 * <Icon icon="face" />
 */

'use strict';

var React = require( 'react' );
var mergeAndPrefix = require( './functions/mergeAndPrefix' );
var hexToRgb = require( './functions/hexToRgb' );

class Icon extends React.Component {
    getStyle() {
        return {
            fontSize: this.props.size,
            fontFamily: 'Material Icons',
            fontWeight: 'normal',
            fontStyle: 'normal',
            display: 'inline-block',
            verticalAlign: 'middle',
            width: '1em',
            height: '1em',
            lineHeight: 1,
            textTransform: 'none',
            letterSpacing: 'normal',
            wordWrap: 'normal',
            WebkitFontSmoothing: 'antialiased',
            textRendering: 'optimizeLegibility',
            MozOsxFontSmoothing: 'grayscale',
            fontFeatureSettings: 'liga'
        };
    }

    render() {
        var props = this.props;

        var iconStyle = this.getStyle();

        //`style.color` can overwrite the `themeColor`
        iconStyle = mergeAndPrefix(
            iconStyle,
            props.disabled ? {color: hexToRgb( props.themeColor, 0.3 )} : {color: hexToRgb( props.themeColor )},
            props.style,
            props.style && props.style.color && (
                props.disabled ? {color: hexToRgb( props.style.color, 0.3 )} : {color: hexToRgb( props.style.color )}
            )
        );

        return (
            <i style={iconStyle}>
                {props.icon}
            </i>
        );
    }
}

Icon.propTypes = {
    icon: React.PropTypes.string,
    size: React.PropTypes.number,
    themeColor: React.PropTypes.string,
    disabled: React.PropTypes.bool
};

Icon.defaultProps = {
    icon: 'face',
    size: 18,
    themeColor: '#9dbaef',
    disabled: false
};

module.exports = Icon;