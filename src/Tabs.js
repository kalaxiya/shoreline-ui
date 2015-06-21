/**
 * Created by linzerui on 15/6/13.
 */

/**
 * Usage:
 *
 * var labels = ["one", "two", "three"];
 *
 * var a = <div>content</div>,
 *     b = <p>content</p>,
 *     c = <span>content</span>;
 *
 * var items = [a, b, c];
 *
 * function onChange( index, item ) {}
 *
 * <Tabs labels={labels} items={items} onChange={onChange} />
 */

"use strict";

var React = require( "react" );
var mergeAndPrefix = require( "./functions/mergeAndPrefix" );
var hexToRgb = require( "./functions/hexToRgb" );

class Tabs extends React.Component {
    constructor( props ) {
        super( props );

        var selectedIndex = props.selectedIndex;
        if ( selectedIndex >= props.labels.length || selectedIndex < 0 ) {
            selectedIndex = 0;
        }

        this.state = {
            selectedIndex: selectedIndex
        };
    }

    getStyle() {
        return {
            root: {
                width: "100%"
            },
            labelWrap: {
                position: "relative",
                backgroundColor: hexToRgb( this.props.themeColor )
            },
            labelList: {
                display: "table",
                position: "relative",
                margin: 0,
                padding: 0,
                width: "100%",
                whiteSpace: "nowrap",
                zIndex: 2
            },
            label: {
                display: "table-cell",
                cursor: "pointer",
                textAlign: "center",
                verticalAlign: "middle",
                height: 45,
                color: "#fff",
                opacity: 0.6,
                fontSize: 14,
                boxSizing: "border-box"
            },
            item: {
                position: "relative",
                display: "none"
            },
            flag: {
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                height: 2,
                left: 0,
                bottom: 0,
                zIndex: 1,
                transition: "all 300ms ease"
            }
        };
    }

    componentDidUpdate() {
        var selectedIndex = this.state.selectedIndex,
            selectedItem = this.props.items[ selectedIndex ];

        this.props.onChange( selectedIndex, selectedItem );
    }

    _handleClick( index ) {
        if ( this.state.selectedIndex !== index ) {
            this.setState({
                selectedIndex: index
            });
        }
    }

    render() {
        var props = this.props,
            state = this.state;

        var styles = this.getStyle(),
            rootStyle = mergeAndPrefix( styles.root, props.style ),
            labelWrapStyle = styles.labelWrap,
            labelListStyle = styles.labelList,
            labelStyle = styles.label,
            itemStyle = styles.item,
            flagStyle = styles.flag;

        //if `labels.length` and `items.length` is not equal
        var labels = props.labels,
            items = props.items;

        if ( labels.length > items.length ) {
            labels = labels.slice( 0, items.length );
        } else if ( labels.length < items.length ) {
            items = items.slice( 0, labels.length );
        }

        //distribution the width
        var width = 100 / labels.length + "%";

        labelStyle = mergeAndPrefix( labelStyle, {
            width: width
        });
        flagStyle = mergeAndPrefix( flagStyle, {
            width: width,
            transform: "translate3d(" + 100 * state.selectedIndex + "%, 0, 0)"
        });


        var labelList = labels.map(function(v, i){
                return (
                    <li key={i}
                        onClick={this._handleClick.bind(this, i)}
                        style={mergeAndPrefix( labelStyle, i === state.selectedIndex && {opacity: 1} )}>
                        {v}
                    </li>
                )
            }, this),

            itemList = items.map(function(v, i){
                return (
                    <div key={i}
                         style={mergeAndPrefix( itemStyle, i === state.selectedIndex && {display: "block"} )}>
                        {v}
                    </div>
                )
            });

        return (
            <div style={rootStyle}>

                <div style={labelWrapStyle}>
                    <ul style={labelListStyle}>
                        {labelList}
                    </ul>

                    <b style={flagStyle}></b>
                </div>

                <div>
                    {itemList}
                </div>

            </div>
        );
    }
}

Tabs.propTypes = {
    themeColor: React.PropTypes.string,
    labels: React.PropTypes.arrayOf( React.PropTypes.string ),
    items: React.PropTypes.arrayOf( React.PropTypes.element ),
    position: React.PropTypes.string,
    selectedIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
    style: React.PropTypes.object
};

Tabs.defaultProps = {
    themeColor: "#9dbaef",
    labels: ["label one", "label two"],
    items: [<div>item one</div>, <div>item two</div>],
    position: "top",
    selectedIndex: 0,
    onChange: function() {}
};

module.exports = Tabs;