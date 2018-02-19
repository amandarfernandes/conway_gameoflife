import React, { Component } from 'react';


class GameControls extends Component {
  

  render() {
  
    return (
      <form>
      <button type="button" 
              onClick={this.props.onRun}
      >Run</button>
      <button type="button" 
              onClick={this.props.onPause}
      >Pause</button>
      <button type="button" 
              onClick={this.props.onClear}
      >Clear</button>
      <button type="button" 
              onClick={this.props.onRandomize}>
      Randomize
      </button>
      </form>
    )
  }
  
}

export default GameControls;