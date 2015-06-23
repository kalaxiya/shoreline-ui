/**
 * Created by linzerui on 15/6/9.
 */

/**
 * Todo:
 * enable return the origin element ( no wrap with a `div` )
 */

/**
 * Usage:
 *
 * <Draggable>
 *     anything you want to drag
 * </Draggable>
 */

'use strict';

var React = require( 'react' );
var assign = require( 'object-assign' );

var emptyFunction = function() {};

class Draggable extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            dragging: false,
            _x: 0,
            _y: 0,
            //initial position from props
            left: props.start.left || 0,
            top: props.start.top || 0
        };

        this._bindHandleDrag = this._handleDrag.bind( this );
        this._bindHandleEnd = this._handleDragEnd.bind( this );
    }

    getStyle() {
        return {
            userSelect: 'none',
            position: 'absolute',
            cursor: 'move'
        }
    }

    _handleDragStart( e ) {
        this.props.onDragStart();

        var node = React.findDOMNode( this );

        this.setState({
            dragging: true,
            _x: e.clientX - node.offsetLeft,
            _y: e.clientY - node.offsetTop
        });

        window.addEventListener( 'mousemove', this._bindHandleDrag, false );
        window.addEventListener( 'mouseup', this._bindHandleEnd, false );
    }

    _handleDrag( e ) {
        var props = this.props,
            state = this.state,
            node = React.findDOMNode( this ),
            parentNode = node.offsetParent,
            newState = {};

        //calculate the position ( `px` )
        if ( props.axis === 'both' || props.axis === 'x' ) {
            newState.left = e.clientX - state._x;
        }
        if ( props.axis === 'both' || props.axis === 'y' ) {
            newState.top = e.clientY - state._y;
        }

        /**
         * if the initial position from props uses the `%` format
         * then return the same format
         */
        if ( typeof state.left === 'string' && state.left.slice( -1 ) === '%' ) {
            newState.left = ( newState.left / parentNode.clientWidth ) * 100 + '%';
        }
        if ( typeof state.top === 'string' && state.top.slice( -1 ) === '%' ) {
            newState.top = ( newState.top / parentNode.clientHeight ) * 100 + '%';
        }

        this.setState( newState, function(){
            this.props.onDrag( this._getPosition() );
        });
    }
    
    _handleDragEnd( e ) {
        window.removeEventListener( 'mousemove', this._bindHandleDrag, false );
        window.removeEventListener( 'mouseup', this._bindHandleEnd, false );

        this.setState({
            dragging: false
        });

        this.props.onDragEnd( e );
    }

    _getPosition() {
        return {
            left: this.state.left,
            top: this.state.top
        }
    }

    componentWillReceiveProps( nextProps ) {
        var newState = {};

        if ( nextProps.start ) {
            if ( nextProps.start.left ) {
                newState.left = nextProps.start.left;
            }
            if ( nextProps.start.top ) {
                newState.top = nextProps.start.top;
            }
        }

        this.setState( newState );
    }

    componentWillUnmount() {
        window.removeEventListener( 'mousemove', this._bindHandleDrag, false );
        window.removeEventListener( 'mouseup', this._bindHandleEnd, false );
    }

    render() {
        var style = this.getStyle();

        assign( style, {
            left: this.state.left,
            top: this.state.top
        });

        var props = {
            style: style,
            className: 'draggable',
            onMouseDown: this._handleDragStart.bind( this ),
            onMouseUp: this._handleDragEnd.bind( this )
        };

        return React.DOM.div( props, this.props.children );
    }
}

Draggable.propTypes = {
    onDragStart: React.PropTypes.func,
    onDrag: React.PropTypes.func,
    onDragEnd: React.PropTypes.func,
    axis: React.PropTypes.string,
    start: React.PropTypes.object
};

Draggable.defaultProps = {
    onDragStart: emptyFunction,
    onDrag: emptyFunction,
    onDragEnd: emptyFunction,
    axis: 'both',
    start: {}
};

module.exports = Draggable;