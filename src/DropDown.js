/**
 * Created by linzerui on 15/6/16.
 */

/**
 * var options = [
 *     {value: value0, label: label0},
 *     {value: value1, label: label1},
 *     {value: value2, label: label2}
 * ];
 *
 * function onChange( value ) {}
 *
 * <DropDown options={options} value="value0" onChange={onChange} />
 */

"use strict";

var React = require( "react" );
var Icon = require( "./Icon" );
var DropDownItem = require( "./DropDownItem" );
var mergeAndPrefix = require( "./functions/mergeAndPrefix" );
var hexToRgb = require( "./functions/hexToRgb" );

class DropDown extends React.Component {
    constructor( props ) {
        super( props );

        var selectedIndex,
            i = 0,
            len = props.options.length;

        if ( props.value ) {
            for ( ; i < len; i ++ ) {
                if ( props.options[i].value === props.value ) {
                    selectedIndex = i;
                    break;
                }
            }
        }

        selectedIndex = selectedIndex || 0;

        this.state = {
            expanded: false,
            selectedIndex: selectedIndex,
            hovered: false,
            hoverIndex: -1
        };

        this._bindHandleWindowClick = this._handleWindowClick.bind( this );
    }

    getStyle() {
        var props = this.props;

        return {
            root: {
                position: "relative",
                textAlign: "center",
                display: "inline-block",
                height: 30,
                fontSize: 12,
                margin: "0 20px"
            },
            handler: {
                position: "relative",
                textAlign: "right",
                zIndex: 2,
                height: 29,
                lineHeight: "29px",
                borderBottom: "1px solid " + hexToRgb( props.themeColor, 0.5 ),
                cursor: "pointer"
            },
            options: {
                position: "absolute",
                left: 0,
                top: -5,
                boxSizing: "border-box",
                borderRadius: 5,
                padding: "5px 0",
                overflow: "hidden"
            },
            item: {
                height: 30,
                boxSizing: "border-box",
                lineHeight: "30px",
                listStyle: "none",
                whiteSpace: "nowrap",
                cursor: "pointer",
                backgroundColor: hexToRgb( props.themeColor )
            }
        };
    }

    _handleOpen() {
        this.setState({
            expanded: true
        });
    }

    _handleSelect( index ) {
        var props = this.props;

        this.setState({
            expanded: false,
            selectedIndex: index
        }, function(){
            props.onChange( props.options[ index ].value );
        });
    }

    _handleStopPropagation( e ) {
        e.stopPropagation();
    }

    _handleWindowClick() {
        this.setState({
            expanded: false
        });
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
    }

    _handleItemHover( index ) {
        this.setState({
            hoverIndex: index
        })
    }

    setWidth() {
        var props = this.props;

        var rootNode = React.findDOMNode( this ),
            optionsNode = React.findDOMNode( this.refs.options );

        if ( props.style && props.style.hasOwnProperty( "width" ) ) {
            optionsNode.style.width = "100%";
            return;
        }

        rootNode.style.width = optionsNode.offsetWidth + "px";
    }

    componentDidMount() {
        window.addEventListener( "click", this._bindHandleWindowClick, false );
        this.setWidth();
    }

    componentWillUnmount() {
        window.removeEventListener( "click", this._bindHandleWindowClick, false );
    }

    render() {
        var props = this.props,
            state = this.state;

        var styles = this.getStyle(),
            rootStyle = mergeAndPrefix( styles.root, props.style ),
            handlerStyle = mergeAndPrefix( styles.handler, state.hovered && {
                    borderBottom: "1px solid " + hexToRgb( props.themeColor, 0.8 )
                }),
            optionsStyle = mergeAndPrefix(
                styles.options,
                state.expanded && {
                    zIndex: 3,
                    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.16), 0 3px 10px rgba(0, 0, 0, 0.23)",
                    transform: "translate3d(0, -" + 30 * state.selectedIndex  + "px, 0)",
                    backgroundColor: hexToRgb( props.themeColor )
                },
                !state.expanded && {
                    transition: "transform 300ms ease"
                }),
            itemStyle = mergeAndPrefix(
                styles.item,
                !state.expanded && {
                    backgroundColor: "transparent",
                    transition: "all 300ms ease"
                });

        var options = props.options.map(function(v, i){
            return (
                <li key={v.value + i}
                    style={mergeAndPrefix(
                        itemStyle,
                        !state.expanded && i !== state.selectedIndex && {visibility: "hidden", opacity: 0, transitionDuration: "0ms"},
                        !state.expanded && i === state.selectedIndex && {transform: "translate3d(0, -" + 30 * i +"px, 0)"}
                        )}
                    >
                    <DropDownItem
                        onMouseOver={this._handleItemHover.bind(this, i)}
                        onClick={this._handleSelect.bind(this, i)}
                        hoverStyle={state.expanded && i === state.hoverIndex && {backgroundColor: "rgba(255, 255, 255, 0.2)"}}
                        selectedStyle={state.expanded && i === state.selectedIndex && {color: "#fff"}}
                        >
                        {v.label}
                    </DropDownItem>
                </li>
            )
        }, this);

        return (
            <div onClick={this._handleStopPropagation}
                 style={rootStyle}>

                <div onClick={this._handleOpen.bind(this)}
                     onMouseOver={this._handleMouseOver.bind(this)}
                     onMouseOut={this._handleMouseOut.bind(this)}
                     style={handlerStyle}>
                    <Icon icon="arrow_drop_down" themeColor={props.themeColor} />
                </div>
                <ul ref="options" style={optionsStyle}>
                    {options}
                </ul>

            </div>
        )
    }
}

DropDown.propTypes = {
    themeColor: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    options: React.PropTypes.arrayOf( React.PropTypes.object ),
    onChange: React.PropTypes.func
};

DropDown.defaultProps = {
    themeColor: "#9dbaef",
    options: [
        {value: "item0", label: "label0"},
        {value: "item1", label: "label1"},
        {value: "item2", label: "label2"}
    ],
    onChange: function() {}
};

module.exports = DropDown;