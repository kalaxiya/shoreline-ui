/**
 * Created by linzerui on 15/6/15.
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
 * <Toggle value={boolean} onChange={onChange} />
 */

'use strict';

var React = require( 'react' );
var mergeAndPrefix = require( './functions/mergeAndPrefix' );
var hexToRgb = require( './functions/hexToRgb' );

class Toggle extends React.Component {
    getStyle() {
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
                zIndex: 1,
                cursor: 'pointer'
            },
            label: {
                display: 'block',
                overflow: 'hidden'
            },
            wrap: {
                float: 'left',
                position: 'relative',
                width: 36,
                height: 24,
                margin: '0 16px 0 0'
            },
            stick: {
                position: 'relative',
                top: 5,
                height: 14,
                borderRadius: 7,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                transition: 'all 450ms ease'
            },
            circle: {
                position: 'absolute',
                width: 20,
                height: 20,
                borderRadius: '50%',
                left: 0,
                top: 2,
                backgroundColor: '#ffffff',
                boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.239216) 0px 1px 4px',
                transition: 'all 450ms ease'
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
            wrapStyle = mergeAndPrefix(
                styles.wrap,
                props.labelPosition === 'left' && {
                    float: 'right',
                    margin: '0 0 0 16px'
                }),
            stickStyle = mergeAndPrefix(
                styles.stick,
                props.checked && {
                    backgroundColor: hexToRgb( props.themeColor, 0.5 )
                }),
            circleStyle = mergeAndPrefix(
                styles.circle,
                props.checked && {
                    backgroundColor: props.themeColor,
                    transform: 'translate3d(16px, 0, 0)'
                });

        return (
            <div style={rootStyle}>

                <div style={wrapStyle}>
                    <div style={stickStyle}></div>
                    <div style={circleStyle}></div>
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

Toggle.propTypes = {
    themeColor: React.PropTypes.string,
    checked: React.PropTypes.bool,
    label: React.PropTypes.string,
    labelPosition: React.PropTypes.oneOf( ['left', 'right'] ),
    onChange: React.PropTypes.func
};

Toggle.defaultProps = {
    themeColor: '#9dbaef',
    checked: false,
    label: 'a label is required',
    labelPosition: 'right',
    onChange: function() {}
};

module.exports = Toggle;