import React, { Component } from 'react';

class Cell extends Component{
   
  handleSelect = (e)=>{
    this.props.onSelect(this.props.row,this.props.col);
  }
  
  render() {
    const {cellClass, cellId} = this.props;
     
    return (
         <div className={cellClass}
              id={cellId}
               onClick={this.handleSelect}
         >
         </div>
     );
  }
}
export default Cell;