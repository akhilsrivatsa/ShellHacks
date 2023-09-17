import React, { Component } from 'react';
import './square.css';

class Square extends Component{

  constructor(props)
  {
    super(props);
    
  }
  colorFill = (i , j ) =>{
   
    
    let start = this.props.start;
    let end = this.props.end;
    let grid = this.props.grid;
    let i1 = start[0];
    let j1 = start[1];
    let i2 = end[0];
    let j2 = end[1];
   let styleClass = {
      backgroundColor : '',
    }
    if(i == i1 && j == j1) {
      styleClass.backgroundColor = 'yellow';
      
    }
    if(i == i2 && j == j2) styleClass.backgroundColor = 'lawnGreen';
    if(grid[i][j] == -1) styleClass.backgroundColor = 'black'
    return styleClass;
   }
 
    render(){ 
    let grid = this.props.grid;
    
    return(
      <div id = "Square" style = {{
      display : 'grid',
      gridTemplateColumns : `repeat(${this.props.cols} , 30px)`
      }}>
      {
        grid.map((rows , i) =>
        rows.map((cols , j) =>{
          let style = this.colorFill(i , j);
          return <div
                   row = {i} col = {j} 
                   key = {`${i}-${j}`} 
                  className = "Square" 
                  ref = {(ref) =>{
                    
                    this.props.myRef[i][j] = ref;
                    
                   }}
                   style = {style}
                   onClick = {this.props.clickHandler} 
                   onMouseMove = {this.props.MouseMove}
                   onMouseUp = {this.props.MouseUp}
                   onMouseDown = {this.props.MouseDown}>
                  </div>
        })
      )
      } </div>    
      
)
}
  
}
export default Square;
