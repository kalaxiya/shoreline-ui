# Shoreline-UI

Shoreline-UI is a set of [React](http://facebook.github.io/react/) components.

Shoreline-Ui is imperfect currently and I'm making it more better. :)

## Installation

Shoreline-UI is available as an [npm package](https://www.npmjs.com/package/shoreline-ui).

    npm install shoreline-ui
    
After that you'll find all the components in the /src folder.

## Usage

You can use shoreline-ui like this:

    // MyApp.js
    
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
                    <DropDown options={options} value="lin" onChange={this.handleDropDownChange.bind(this)}  />
                    <Slider max={10} min={1} step={0.1} onChange={this.handleSliderChange.bind(this)} />
                </div>
            )
        }
    }
    
    module.exports = MyApp;
    
## Customization

Shoreline-UI components defined with inline style. 
If you want to overwrite the style like `width`, `float`, `display` etc. you can pass a `style` prop to a component. 
Maybe you want to change the theme built-in then you can pass a `themeColor` prop.
That is:

    <Slider style={{width: 200, margin: "0 auto"}} />
    <DropDown themeColor="#FEADBE" />
    
With `themeColor`, components can only receive `hex` value currently. `rgb` and `rgba` will coming soon. :)


## License

[MIT license](https://github.com/linzerui/shoreline-ui/blob/master/LICENSE)