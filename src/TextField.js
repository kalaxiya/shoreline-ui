/**
 * Created by linzerui on 15/6/19.
 */

/**
 * Todo:
 *
 * form valid
 */

/**
 * Usage:
 *
 * function onChange( value ) {}
 *
 * <TextField multiLine={false} placeholder="Your Name" floatLabel="Label Text" onChange={onChange} />
 */

'use strict';

var React = require( 'react' );
var mergeAndPrefix = require( './functions/mergeAndPrefix' );
var hexToRgb = require( './functions/hexToRgb' );

class TextField extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            focus: false,
            value: props.value || props.defaultValue
        };
    }

    getStyle() {
        var props = this.props;

        return {
            root: {
                fontSize: 14,
                height: 48,
                lineHeight: '24px',
                display: 'inline-block',
                position: 'relative',
                transition: 'height 300ms ease'
            },
            textInput: {
                position: 'relative',
                width: '100%',
                height: '100%',
                padding: 0,
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                color: '#000',
                font: 'inherit'
            },
            textAreaWrap: {
                position: 'relative',
                width: '100%',
                height: '100%',
                font: 'inherit'
            },
            shadow: {
                position: 'absolute',
                opacity: 0,
                width: '100%',
                overflow: 'hidden',
                resize: 'none',
                font: 'inherit',
                border: 'none'
            },
            textArea: {
                position: 'relative',
                color: '#000',
                width: '100%',
                resize: 'none',
                padding: 0,
                marginTop: 12,
                boxSizing: 'border-box',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                overflow: 'hidden',
                font: 'inherit'
            },
            placeholder: {
                position: 'absolute',
                lineHeight: '48px',
                opacity: 0.2,
                transition: 'all 300ms ease',
                color: '#000'
            },
            floatLabel: {
                position: 'absolute',
                lineHeight: '48px',
                opacity: 0.2,
                transition: 'all 300ms ease',
                color: '#000',
                transform: 'scale(1) translate3d(0, 0, 0)',
                transformOrigin: 'left top 0'
            },
            hr: {
                position: 'absolute',
                width: '100%',
                height: 1,
                border: 'none',
                lineHeight: 0,
                backgroundColor: 'rgb(0, 0, 0)',
                opacity: 0.3,
                left: 0,
                bottom: 8,
                margin: 0
            },
            focusHr: {
                position: 'absolute',
                width: '100%',
                height: 2,
                border: 'none',
                lineHeight: 0,
                backgroundColor: hexToRgb( props.themeColor ),
                transform: 'scaleX(0)',
                transition: 'all 300ms ease',
                left: 0,
                bottom: 8,
                margin: 0
            }
        }
    }

    _handleChange( e ) {
        var props = this.props;

        this.setState({
            value: e.target.value
        });

        if ( props.multiLine ) {
            var shadow = React.findDOMNode( this.refs.shadow );
            if ( e.target.value !== undefined ) {
                shadow.value = e.target.value;
            }

            React.findDOMNode( this ).style.height = ( +shadow.scrollHeight + 24 ) + 'px';
        }

        if ( typeof props.onChange === 'function' ) {
            props.onChange( e.target.value );
        }
    }

    _handleFocus() {
        this.setState({
            focus: true
        }, function(){
            this.props.onFocus && this.props.onFocus();
        });
    }

    _handleBlur() {
        this.setState({
            focus: false
        }, function(){
            this.props.onBlur && this.props.onBlur();
        });
    }

    setHeight( newValue ) {
        var shadow = React.findDOMNode( this.refs.shadow );

        if ( newValue !== undefined ) {
            shadow.value = newValue;
        }

        React.findDOMNode( this ).style.height = ( +shadow.scrollHeight + 24 ) + 'px';
    }

    getValue() {
        if ( this.props.multiLine ) {
            return React.findDOMNode( this.refs.textArea ).value;
        }
        return React.findDOMNode( this.refs.input ).value;
    }

    componentDidMount() {
        if ( this.props.multiLine ) {
            this.setHeight();
        }
    }

    componentWillReceiveProps( nextProps ) {
        if ( nextProps.value !== this.props.value ) {
            this.setHeight( nextProps.value );
            this.setState({
                value: nextProps.value
            });
        }
    }

    render() {
        var props = this.props,
            state = this.state;

        var styles = this.getStyle(),
            rootStyle = mergeAndPrefix( styles.root, props.style ),
            floatLabelStyle = mergeAndPrefix(
                styles.floatLabel,
                state.value && {
                    transform: 'perspective(1px) scale(0.75) translate3d(0px, -18px, 0px)',
                    color: '#000',
                    opacity: 0.2
                },
                state.focus && !state.value && {
                    transform: 'perspective(1px) scale(0.75) translate3d(0px, -18px, 0px)',
                    color: hexToRgb( props.themeColor ),
                    opacity: 1
                }
            ),
            textInputStyle = mergeAndPrefix(
                styles.textInput,
                props.style && props.style.color && {
                    color: props.style.color
                }
            ),
            shadowStyle = mergeAndPrefix( styles.shadow ),
            textAreaStyle = mergeAndPrefix( styles.textArea ),
            placeholderStyle = mergeAndPrefix(
                styles.placeholder,
                props.floatLabel && {
                    opacity: 0
                },
                state.value && {
                    opacity: 0
                },
                !state.value && state.focus && {
                    opacity: 0.2
                },
                props.style && props.style.color && {
                    color: props.style.color
                }
            ),
            hrStyle = mergeAndPrefix(
                styles.hr,
                props.style && props.style.color && {
                    backgroundColor: props.style.color
                }
            ),
            focusHrStyle = mergeAndPrefix(
                styles.focusHr,
                state.focus && {
                    transform: 'scaleX(1)'
                }
            );

        var ele;

        if ( props.multiLine ) {
            ele = (
                <div style={styles.textAreaWrap}>
                    <textarea style={shadowStyle}
                              value={state.value}
                              ref="shadow"
                              rows="1"
                              readOnly
                        >
                    </textarea>

                    <textarea style={mergeAndPrefix( textAreaStyle, {height: '100%'} )}
                              value={state.value}
                              ref="textArea"
                              onChange={this._handleChange.bind(this)}
                              onFocus={this._handleFocus.bind(this)}
                              onBlur={this._handleBlur.bind(this)}
                    ></textarea>
                </div>
            );

        } else {
            ele =
                <input type="text"
                       style={textInputStyle}
                       value={state.value}
                       ref="input"
                       onChange={this._handleChange.bind(this)}
                       onFocus={this._handleFocus.bind(this)}
                       onBlur={this._handleBlur.bind(this)}
                />;
        }

        var floatLabel = props.floatLabel ? (
            <span style={floatLabelStyle}>{props.floatLabel}</span>
        ) : null;

        return (
            <div style={rootStyle}>
                {floatLabel}
                <span style={placeholderStyle}>{props.placeholder}</span>

                {ele}

                <hr style={hrStyle}/>
                <hr style={focusHrStyle}/>
            </div>
        )
    }
}

TextField.propTypes = {
    themeColor: React.PropTypes.string,
    multiLine: React.PropTypes.bool,
    placeholder: React.PropTypes.string.isRequired,
    floatLabel: React.PropTypes.string,
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
};

TextField.defaultProps = {
    themeColor: '#9dbaef',
    multiLine: false,
    placeholder: 'You should always set a placeholder',
    floatLabel: 'Label Text'
};

module.exports = TextField;