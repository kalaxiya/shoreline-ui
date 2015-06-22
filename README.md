# Shoreline-UI

Shoreline-UI is a set of [React](http://facebook.github.io/react/) components.

At first I choice [Material-UI](https://github.com/callemall/material-ui) for my personal project. It's very very good. It makes all the styles inline and this deeply shocked me. But I found it use the `mixins` that which is not supported in ES6 and it is also a little big to my tiny project. I have just begin to learn React and I like it very much. So I decide to make a set of common components like Material-UI for my project and I hope this can also improve my ability to React. The [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) is also very beautiful and I would like to learn it, too.

Shoreline-UI is imperfect currently and I'm making it more better.

## Installation

Shoreline-UI is available as an [npm package](https://www.npmjs.com/package/shoreline-ui).

    npm install shoreline-ui
    
After that you'll find all the components in the /src folder.

## Usage

You can use shoreline-ui like this:

    ```javascript
    var React = require( "./react" ),
        sui = require( "./shoreline-ui" );
    
    var DropDown = sui.DropDown,
        Slider = sui.Slider;
    
    class MyApp extends React.component {
        handleDropDownChange( value ) {
            console.log( "you choice: " + value );
        }
        
        handleSliderChange( value ) {
            console.log( "current value: " + value );
        }
        
        render() {
            var options = [
                {value: "lin", label: "林"},
                {value: "ze", label: "泽"},
                {value: "rui", label: "锐"}
            ];
            
            return (
                <div>
                    <DropDown options={options} 
                              value="lin" 
                              onChange={this.handleDropDownChange.bind(this)}  />
                              
                    <Slider max={10} 
                            min={1} 
                            step={0.1} 
                            onChange={this.handleSliderChange.bind(this)} />
                </div>
            )
        }
    }
    
    module.exports = MyApp;
    ```
    
## Customization

Shoreline-UI components defined with inline style. 

If you want to overwrite the style like `width`, `float`, `display` etc. you can pass a `style` prop to a component. 

Maybe you want to change the theme built-in then you can pass a `themeColor` prop.

That is:

    ```javascript
    <Slider style={{width: 200, margin: "0 auto"}} />
    <DropDown themeColor="#FEADBE" />
    ```
    
With `themeColor`, components can only receive `hex` value currently. `rgb` and `rgba` will coming soon. :)


## License

[MIT license](https://github.com/linzerui/shoreline-ui/blob/master/LICENSE)