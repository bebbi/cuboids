import React, { Component } from 'react';
import './App.css';

import Cuboid, { params } from './Cuboid'
import Parameters from './Parameters'

const paramsFromDefinition = (params = {}) =>
  Object.assign(
    {},
    ...Object.keys(params).map(p => ({
      [p]: params[p].default
    }))
  )



class App extends Component {
  state = {
    parameters: paramsFromDefinition(params)
  }

  updateParams = parameters => {
    this.setState({ parameters })
  }

  render() {
    return (
      <div width='100vw' height='100vh' className="App">
        <Cuboid
          l={this.state.parameters.length}
          w={this.state.parameters.width}
          h={this.state.parameters.height}
          al={this.state.parameters.skew}
          offX={this.state.parameters.offsetX}
          offY={this.state.parameters.offsetY}
        />
        <Parameters
          definitions={params}
          params={this.state.parameters}
          onEdit={this.updateParams}
        />
      </div>
    );
  }
}




export default App;
