/**
 * Created by linzerui on 15/6/12.
 */

"use strict";

var Modernizr = require( "../utils/modernizr.custom" );
var assign = require( "object-assign" );

module.exports = function() {
    //merge
    var args = Array.prototype.slice.call( arguments, 0 );

    var base = {},
        i = 0,
        len = args.length;

    for ( ; i < len; i++ ) {
        if ( args[i] ) {
            base = assign( base, args[i] );
        }
    }

    //prefixed
    var prefixedStyle = {},
        key;

    for ( key in base ) {
        prefixedStyle[ Modernizr.prefixed( key ) ] = base[ key ];
    }

    return prefixedStyle;
};