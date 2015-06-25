/**
 * Created by linzerui on 15/6/23.
 */
module.exports = {
    entry: './js/entry.js',
    output: {
        path: __dirname,
        filename: './build/app.js'
    },
    resolve: {
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'jsx?harmony'
            }
        ]
    }
};