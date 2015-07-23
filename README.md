# Shoreline-UI

Shoreline-UI is a set of [React](http://facebook.github.io/react/) components.

At first I chose [Material-UI](https://github.com/callemall/material-ui) for my personal project. It's very very good. It makes all the styles inline and this deeply shocked me. But I found it use the `mixins` that which is not supported in ES6 and it is also a little big to my tiny project. I have just begin to learn React and I like it very much. So I decide to make a set of common components like Material-UI for my project. The [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) is also very beautiful and I'll add the design style to components.

Shoreline-UI is imperfect and I'm making it more better.

## Installation

Shoreline-UI is available as an [npm package](https://www.npmjs.com/package/shoreline-ui).

    npm install shoreline-ui
    
After that you'll find all the components in the /src folder.

## Usage

You can use shoreline-ui like this:

```javascript

    var React = require( './react' ),
        sui = require( './shoreline-ui' );
    
    var DropDown = sui.DropDown,
        Slider = sui.Slider;
    
    class MyApp extends React.component {
        handleDropDownChange( value ) {
            console.log( 'you choice: ' + value );
        }
        
        handleSliderChange( value ) {
            console.log( 'current value: ' + value );
        }
        
        render() {
            var options = [
                {value: 'lin', label: '海'},
                {value: 'ze', label: '岸'},
                {value: 'rui', label: '线'}
            ];
            
            return (
                <div>
                    <DropDown options={options} 
                              value='lin' 
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
    
With `themeColor`, components can only receive `hex` and `rgb` currently. Not support `red`, `green` etc.

## Todo

Add more components and `Material Design` style.


## License

[MIT license](https://github.com/linzerui/shoreline-ui/blob/master/LICENSE)