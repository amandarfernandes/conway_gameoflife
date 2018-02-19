import React, { Component } from 'react';
import update from 'immutability-helper';
import './Game.css';
import GameGrid from './GameGrid.js';
import GameControls from './GameControls.js';

class Game extends Component {
  static defaultProps = {
      rows:30,
      cols:50
  }
  
  constructor(props) {
    super(props);
    this.state={
        generation: 0,
        grid: Array(this.props.rows).fill()
            .map(()=> Array(this.props.cols).fill(0))  
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.gameRandomize = this.gameRandomize.bind(this);
    this.gameClear = this.gameClear.bind(this);
    this.gameRun = this.gameRun.bind(this);
    this.gamePause = this.gamePause.bind(this);
  }


  handleSelect(row,col) {
    const grid = update(this.state.grid,{
      [row]: {
       [col]: {$set:true}
      }})
    this.setState({grid});
  }

  populateGrid() {
    //make a copy of the grid 
    var grid = this.state.grid.map(row=>(row.slice())); //console.log(grid);
    for (var row in grid) {
      for(var col in grid[row]) {
        //each cell has a 25% chance of being a 1
        grid[row][col]= (Math.floor(Math.random()* 4)===1)? 1:0;
      }
    }
    //set state
    this.setState({generation:0,grid});
  }

 componentDidMount() {
   //seed grid
    this.populateGrid(); 
   //start game
    this.gameRun();
 }

gameRun() {
  clearInterval(this.intervalId);
  this.intervalId = setInterval(()=>{
    this.play();
  },1000);
  
}

play = ()=>{

  const {grid:oGrid} = this.state;   
  var grid = this.state.grid.map(row=>(row.slice()));
  
  oGrid.forEach((row,i)=>{
    row.forEach((col,j)=> {
      let sum = 0;
      if (i === 0) {
       if (j === 0)
        sum = oGrid[i][j+1]+oGrid[i+1][j]+oGrid[i+1][j+1];
       else if (j === this.props.cols-1)
         sum = oGrid[i][j-1]+oGrid[i+1][j]+oGrid[i+1][j-1];
       else
         sum = oGrid[i][j+1]+oGrid[i+1][j]+oGrid[i+1][j+1]
                +oGrid[i][j-1]+oGrid[i+1][j-1];
      } else if (i === this.props.rows-1) {
         if (j === 0)
          sum = oGrid[i][j+1]+oGrid[i-1][j]+oGrid[i-1][j+1];
         else if (j === this.props.cols-1)
           sum = oGrid[i][j-1]+oGrid[i-1][j]+oGrid[i-1][j-1];
         else
           sum = oGrid[i][j+1]+oGrid[i-1][j]+oGrid[i-1][j+1]
                +oGrid[i][j-1]+oGrid[i-1][j-1];
      } else {
           if (j === 0)
          sum = oGrid[i][j+1]+oGrid[i+1][j]+oGrid[i+1][j+1]
            +oGrid[i-1][j]+oGrid[i-1][j+1];
         else if (j === this.props.cols-1)
           sum = oGrid[i][j-1]+oGrid[i-1][j]+oGrid[i-1][j-1]
                  +oGrid[i+1][j]+oGrid[i+1][j-1];
         else
           sum = oGrid[i][j+1]+oGrid[i][j-1]+
                oGrid[i-1][j]+oGrid[i-1][j-1]+oGrid[i-1][j+1]+
                oGrid[i+1][j]+oGrid[i+1][j-1]+oGrid[i+1][j+1];
        
      }
      if (sum < 2 || sum > 3 ) grid[i][j] = 0;
      if (sum === 2 || sum === 3) grid[i][j] = 1;     
    })
  })
//  console.log(grid)
this.setState((state) => ({ grid, 
                           generation: state.generation + 1}));
}


gameClear() {
  clearInterval(this.intervalId);
  const grid = Array(this.props.rows).fill().map(()=> Array(this.props.cols).fill(0));
  this.setState({generation:0,grid})  ;
}

gamePause() {
  clearInterval(this.intervalId);
}

gameRandomize() {
  clearInterval(this.intervalId);
  this.populateGrid();
  this.gameRun();
}


render() {
    return (
      <div className="game">
      <h1>Game of Life </h1>
      <h2>Generations:&nbsp; {this.state.generation}</h2>
      <GameGrid grid={this.state.grid} 
                {...this.props} 
                 onSelect={this.handleSelect} 
      />
      <GameControls onRandomize={this.gameRandomize}
                    onClear={this.gameClear}
                    onPause={this.gamePause}
                    onRun={this.gameRun}
      />
      </div>
    );
  }
}

export default Game;
