/**
 * Created by linzerui on 15/5/14.
 */

/**
 * Todo:
 * add a disabled state
 */

/**
 * Usage:
 *
 * function onChange( value ) {}
 *
 * <Checked value={boolean} onChange={onChange} />
 */

'use strict';

var React = require( 'react' );
var mergeAndPrefix = require( './functions/mergeAndPrefix' );
var hexToRgb = require( './functions/hexToRgb' );

var CheckBoxIconOutline = require( './svg-icons/CheckBoxIconOutline' );
var CheckBoxIcon = require( './svg-icons/CheckBoxIcon' );

class CheckBox extends React.Component {
    getStyle() {
        var props = this.props;

        return {
            root: {
                minHeight: 24,
                lineHeight: '24px',
                position: 'relative'
            },
            input: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                opacity: 0,
                zIndex: 0,
                cursor: 'pointer'
            },
            label: {
                display: 'block',
                overflow: 'hidden'
            },
            iconWrap: {
                float: 'left',
                position: 'relative',
                width: 24,
                height: 24,
                margin: '0 16px 0 0'
            },
            outline: {
                position: 'absolute',
                width: 24,
                height: 24,
                left: 0,
                top: 0,
                userSelect: 'none',
                fill: hexToRgb( props.themeColor, 0.5 ),
                transition: 'all 400ms ease'
            },
            icon: {
                position: 'absolute',
                width: 24,
                height: 24,
                left: 0,
                top: 0,
                userSelect: 'none',
                opacity: 0,
                transform: 'scale(0.5)',
                fill: hexToRgb( props.themeColor ),
                transition: 'all 400ms ease'
            }
        }
    }

    _handleChange() {
        this.props.onChange( !this.props.checked );
    }

    render() {
        var props = this.props;

        var styles = this.getStyle(),
            rootStyle = mergeAndPrefix( styles.root, props.style ),
            inputStyle = styles.input,
            labelStyle = styles.label,
            outlineStyle = mergeAndPrefix(
                styles.outline,
                props.checked && {
                    fill: hexToRgb( props.themeColor )
                }),
            iconStyle = mergeAndPrefix(
                styles.icon,
                props.checked && {
                    opacity: 1,
                    transform: 'scale(1)'
                }),
            iconWrapStyle = mergeAndPrefix(
                styles.iconWrap,
                props.labelPosition === 'left' && {
                    float: 'right',
                    margin: '0 0 0 16px'
                });

        return (
            <div style={rootStyle}>

                <div style={iconWrapStyle}>
                    <CheckBoxIconOutline style={outlineStyle} />
                    <CheckBoxIcon style={iconStyle} />
                </div>

                <label style={labelStyle}>{props.label}</label>

                <input type="checkbox"
                       ref="checkbox"
                       style={inputStyle}
                       checked={props.value}
                       onChange={this._handleChange.bind(this)}/>

            </div>
        )
    }
}

CheckBox.propTypes = {
    themeColor: React.PropTypes.string,
    checked: React.PropTypes.bool,
    label: React.PropTypes.string,
    labelPosition: React.PropTypes.oneOf( ['left', 'right'] ),
    onChange: React.PropTypes.func
};

//默认值
CheckBox.defaultProps = {
    themeColor: '#9dbaef',
    checked: false,
    label: 'a label is required',
    labelPosition: 'right',
    onChange: function() {}
};

module.exports = CheckBox;