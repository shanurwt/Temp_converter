import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './assets/boil1.png'
import logo1 from './assets/not1.png'
//-----ScaleNames

const scaleNames= {
  c: 'celsius',
  f: 'fahrenheit'
}

//-----Conversion Functions

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

//------tryConvert

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}


//-----BoilingVerdict

function BoilingVerdict(props){
  if(props.celsius>=100){
    return (<div className='boil'> 
    <p className='hot'>The Water would Boil.</p> 
    <img className='logo' src={logo} width="200px" height="200px" alt="what boil" />
    </div>)
  }
  else{
    return (<div className='not'> 
    <p className='sen'>Water would not Boil.</p> 
    <img className='logo1' src={logo1} width="200px" height="200px" alt="not boiling sir" />
    </div> )
  }
}


//-------TemperatureInput with no state

class TemperatureInput extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange= this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onTemperatureChange(e.target.value);
  }
  render() {
    const temperature = this.props.temperature;
    const scale= this.props.scale;
    return(
      <fieldset className='celsius'>
      <p className='ask'>Enter the temperature in {scaleNames[scale]}: </p>
      <input value={temperature}
              onChange={this.handleChange} />
      </fieldset>
  );
    }
}

//------------Calculator

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.state={
      temperature: '',
      scale:'c'
    };
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

render(){
  const scale = this.state.scale;
  const temperature = this.state.temperature;
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <h1 className='head'>Temperature Converter</h1>
    <TemperatureInput
      scale="c"
      temperature={celsius}
      onTemperatureChange={this.handleCelsiusChange} />
    <TemperatureInput
      scale="f"
      temperature={fahrenheit}
      onTemperatureChange={this.handleFahrenheitChange} />
    <BoilingVerdict
      celsius={parseFloat(celsius)} />
  </div>
  );
}
}


ReactDOM.render(
  <Calculator className="celsius"/>,
  document.getElementById('root')
);
