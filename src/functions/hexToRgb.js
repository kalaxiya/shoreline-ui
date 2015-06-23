/**
 * Created by linzerui on 15/6/15.
 */

'use strict';

module.exports = function( hex, opacity ) {
    if ( /rgb\(.+\)/.test( hex ) ) {
        if ( typeof opacity === 'number' && opacity >=0 && opacity <= 1 ) {
            return hex.replace( 'rgb', 'rgba' ).replace( ')', ', ' + opacity + ')' );
        } else {
            return hex;
        }
    }

    // Expand shorthand form (e.g. '03F') to full form (e.g. '0033FF')
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace( shorthandRegex, function( m, r, g, b ) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );
    var rgb = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;

    if ( !rgb ) {
        return;
    }

    if ( typeof opacity === 'number' && opacity >=0 && opacity <= 1 ) {
        return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + opacity + ')';
    } else {
        return 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
    }
};