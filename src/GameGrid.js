import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import './GameGrid.css';

class GameGrid extends Component {
  static propTypes={
     rows:PropTypes.number.isRequired,
     cols : PropTypes.number.isRequired,
     grid: PropTypes.arrayOf(PropTypes.array).isRequired 
  }

render() {
  const {grid,cols}=this.props;
  const gridWidth=cols*14;
  let gridRow = [];
  grid.forEach((row,i)=>{
      row.forEach((col,j)=>{          
        let key = `${i}-${j}`;
        gridRow = [...gridRow,
            <Cell 
              cellClass={col?"cell on":"cell off"}
              key={key}
              cellId={key}
              row={i}
              col={j}
               onSelect={this.props.onSelect}     
              />];
      });
  });
  return(
   <div className="grid" style={{width:`${gridWidth}px`}}>
                   {gridRow}
  </div>  
  );
}

}

export default GameGrid;