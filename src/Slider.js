/**
 * Created by linzerui on 15/6/9.
 */

/**
 * todo:
 * 1、add a `focus` state
 * 2、enable `➞` and `←` to control the `Slider`
 * 3、add more material design style
 */

/**
 * Usage:
 *
 * function onChange( value ) {}
 *
 * <Slider max={20} min={1} step={0.5} value={5} onChange={onChange} />
 */

"use strict";

var React = require( "react" );
var mergeAndPrefix = require( "./functions/mergeAndPrefix" );
var hexToRgb = require( "./functions/hexToRgb" );
var Draggable = require( "./Draggable" );

class Slider extends React.Component {
    constructor( props ) {
        super( props );

        //calculate initial position percent
        var percent = ( props.value - props.min ) / ( props.max - props.min );

        /**
         * `percent`: the position of `Slider`
         * `value`: the value of hidden input
         * use a hidden input to implement the `step`
         */
        this.state = {
            percent: percent,
            value: props.value,
            hovered: false
        };
    }

    getStyle() {
        var props = this.props;

        return {
            root: {
                position: "relative",
                width: "100%",
                height: 24,
                userSelect: "none",
                cursor: "pointer"
            },
            line: {
                position: "absolute",
                width: "100%",
                height: 2,
                left: 0,
                top: 11,
                backgroundColor: hexToRgb( props.themeColor, 0.3 ),
                transition: "all 300ms ease"
            },
            lineHover: {
                backgroundColor: hexToRgb( props.themeColor, 0.5 )
            },
            filled: {
                height: "100%",
                backgroundColor: hexToRgb( props.themeColor )
            },
            handler: {
                position: "absolute",
                width: 12,
                height: 12,
                top: 6,
                borderRadius: "50%",
                backgroundColor: hexToRgb( props.themeColor ),
                transform: "translateX(-50%)",
                cursor: "pointer"
            },
            shadow: {
                position: "absolute",
                width: 30,
                height: 30,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) scale(0)",
                backgroundColor: hexToRgb( props.themeColor, 0.2 ),
                borderRadius: "50%",
                opacity: 0,
                transition: "all 300ms ease"
            },
            shadowHover: {
                transform: "translate(-15px, -15px) scale(1)",
                opacity: 1
            }
        };
    }

    _handleMouseOver() {
        this.setState({
            hovered: true
        });
    }

    _handleMouseOut() {
        this.setState({
            hovered: false
        });
    };

    //we can accept `{left: "", top: ""}` as the first param while dragging
    _handleDrag( position ) {
        var props = this.props;

        /**
         * we use the `%` format to set the position of `Slider`
         * and received the same way
         * convert the `%` into digital
         */
        var percent = +position.left.slice( 0, -1 ) / 100;

        //limit the range
        if ( percent < 0 ) {
            percent = 0;
        } else if ( percent > 1 ) {
            percent = 1;
        }

        //calculate the `input` value based on percent
        var value = ( props.max - props.min ) * percent + props.min;

        /**
         * we use the `input` value : React.findDOMNode( this.refs.range ).value
         * since this can be in accord with the `step`
         */
        this.setState({
            percent: percent,
            value: value
        }, function(){
            props.onChange( React.findDOMNode( this.refs.range ).value );
        });
    }

    //not only drag, you can also click it
    _handleClick( e ) {
        var props = this.props;

        var node = React.findDOMNode( this.refs.slider ),
            boundingClientRect = node.getBoundingClientRect();

        var percent = ( e.clientX - boundingClientRect.left ) / node.clientWidth,
            value = ( props.max - props.min ) * percent + props.min;

        this.setState({
            percent: percent,
            value: value
        }, function(){
            props.onChange( e, React.findDOMNode( this.refs.range ).value );
        });
    }

    /**
     * since a `click` event will be trigger while `mousemove` ends
     * prevent `Slider` to response the event
     */
    _handleStopPropagation( e ) {
        e.stopPropagation();
    }

    render() {
        var props = this.props,
            state = this.state;

        //initial position
        var start = {
            left: ( state.percent * 100 ) + "%"
        };

        var styles = this.getStyle(),
            rootStyle = mergeAndPrefix( styles.root, props.style ),
            filledStyle = mergeAndPrefix( styles.filled, {width: start.left} ),
            lineStyle = mergeAndPrefix( styles.line, state.hovered && styles.lineHover ),
            handlerStyle = mergeAndPrefix( styles.handler ),
            shadowStyle = mergeAndPrefix( styles.shadow, state.hovered && styles.shadowHover );


        return (
            <div ref="slider"
                 style={rootStyle}
                 onClick={this._handleClick.bind(this)}
                 onMouseOver={this._handleMouseOver.bind(this)}
                 onMouseOut={this._handleMouseOut.bind(this)}>

                <div style={lineStyle}>
                    <div style={filledStyle}></div>
                </div>

                <Draggable axis="x"
                           start={start}
                           onDrag={this._handleDrag.bind(this)}>
                    <div style={handlerStyle}
                         onClick={this._handleStopPropagation}>
                        <i style={shadowStyle}></i>
                    </div>
                </Draggable>

                <input style={{display: "none"}}
                       type="range"
                       ref="range"
                       value={state.value}
                       max={props.max}
                       min={props.min}
                       step={props.step}
                       readOnly
                    />

            </div>
        )
    }
}

Slider.propTypes = {
    themeColor: React.PropTypes.string,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    value: React.PropTypes.number,
    step: React.PropTypes.number,
    onChange: React.PropTypes.func
};

Slider.defaultProps = {
    themeColor: "#9dbaef",
    max: 10,
    min: 0,
    value: 5,
    step: 1,
    onChange: function() {}
};

module.exports = Slider;