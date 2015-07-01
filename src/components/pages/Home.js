/**
 * Created by linzerui on 15/6/23.
 */

'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

class Home extends React.Component {
    getStyle() {
        return {
            root: {
                height: '100%',
                overflow: 'hidden'
            },
            main: {
                textAlign: 'center',
                position: 'absolute',
                width: '100%',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            },
            h1: {
                margin: 0,
                padding: '0 0 30px 0',
                fontWeight: 'normal',
                fontSize: 56,
                fontFamily: 'monaco'
            }
        }
    }

    render() {
        var styles = this.getStyle();

        return (
            <div style={styles.root} className="home">
                <div style={styles.main}>
                    <h1 style={styles.h1}>Shoreline UI</h1>
                    <Link to="get-started">Get Started</Link>
                    <Link to="components">Demo</Link>
                    <a href="https://github.com/linzerui/shoreline-ui" target="_blank">Github</a>
                </div>
            </div>
        )
    }
}

module.exports = Home;