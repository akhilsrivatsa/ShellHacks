import React , {Component, Fragment} from 'react';
import './visualiser.css';
import Square from '../Square/Square';
import Description from '../Description/Description'
import Bfs from '../Algorithms/BFS';
import Header from '../Header/Header';
import Dfs from '../Algorithms/DFS';
import Dijikstra from '../Algorithms/Dijikstra';
import AStar from '../Algorithms/Astar';
let mouseClickedStart = false;
let mouseClickedEnd = false;
let isWallClicked = false;
class visualizer extends Component{

      constructor(props){
         
         super(props);
         this.clickHandler = this.clickHandler.bind(this);
         this.MouseUp = this.MouseUp.bind(this);
         this.MouseDown = this.MouseDown.bind(this);
         this.MouseMove = this.MouseMove.bind(this);
         this.execute = this.execute.bind(this);
         this.clearBlocks = this.clearBlocks.bind(this);
         this.clearAnimation = this.clearAnimation.bind(this);
         this.state = {
            gridState : [],
            cols : 50,
            rows : 18,
            start : [6 , 7],
            end : [6 , 40],
            myRefs : []
         }
         this.initialStart = this.state.start;
         this.initialEnd = this.state.end;
         this.initialState = this.state;
      }
      componentDidMount(){
         this.intitalizeGrid();
      }
      clearBlocks = () =>{
         this.clearAnimation(true);
      }
      clearPath = () =>{
         this.clearAnimation(false);
      }
      clearAnimation = (isWall) =>{
         
        let refs = this.state.myRefs;
        for(let i = 0 ; i < refs.length ; i++)
        {
           for(let j = 0 ; j < refs[i].length ; j++)
           {
              if(refs[i][j].classList.contains('animation_trigger')) refs[i][j].classList.remove('animation_trigger');
              if(refs[i][j].classList.contains('color_path')) refs[i][j].classList.remove('color_path');
            }
        }
       if(isWall) this.intitalizeGrid();
      }
      clickHandler = (e) => {
         const start = e.target.getAttribute("row");
         const end = e.target.getAttribute("col");
         const startPos = this.state.start;
         const endPos = this.state.end;
         if(start == startPos[0] && end == startPos[1]) console.log("Clicked On Start Element");
         else if(start == endPos[0] && end == endPos[1]) console.log("Clicked on End Element");
         else console.log("Clicked to Create A wall");
      }
     
      intitalizeGrid(){
         
         let rows = this.state.rows;
         let cols = this.state.cols;
         let newGrid = [];
         let refGrid = [];
         for(let i = 0 ; i < rows ; i++){
            newGrid.push(Array.from(Array(cols) , () => 0));
            refGrid.push(Array.from(Array(cols) , () => 0));
         }
         
         this.setState({
            gridState : newGrid,
            myRefs : refGrid
         })
         
        
      }
      MouseDown = (e) =>{
         
         const start = Number(e.target.getAttribute("row"));
         const end = Number(e.target.getAttribute("col"));
         const startPos = this.state.start;
         const endPos = this.state.end;
         if(start == startPos[0] && end == startPos[1]) mouseClickedStart = true;
         else if(start == endPos[0] && end == endPos[1]) mouseClickedEnd = true;
         else {
            console.log("Clicked to create a wall");
            let grid = this.state.gridState;
            if(grid[start][end] == -1) grid[start][end] = 0;
            else grid[start][end] = -1;
            this.setState({
               gridState : grid     
            })
            isWallClicked = true;
         }

      }
      MouseMove = (e) =>{
         if(mouseClickedStart)
         {
            const start = Number(e.target.getAttribute("row"));
            const end = Number(e.target.getAttribute("col"));
            const endNode = this.state.end;
            if(endNode[0] != start || endNode[1] != end){
            this.setState({
               start : [start , end]
            })
         }
            
         }
         if(mouseClickedEnd)
         {
            const start = Number(e.target.getAttribute("row"));
            const end =  Number(e.target.getAttribute("col"));
            const beginNode = this.state.start;
            if(beginNode[0] != start || beginNode[1] != end){
            this.setState({
               end : [start , end]
            })  
            }
         }
         if(isWallClicked)
         {
            const start = Number(e.target.getAttribute("row"));
            const end =   Number(e.target.getAttribute("col"));
            let grid = this.state.gridState;
            if((start != this.state.start[0] || end != this.state.start[1]) && (start!=this.state.end[0] || end!=this.state.end[1])){
            grid[start][end] = -1;
            this.setState({
               gridState : grid     
            })
         }
            console.log("Creating a wall");
         }
      }
      execute = (algo , speed , clearBoard , clearWall)=>{
         
         const grid = this.state.gridState;
         const myRef = this.state.myRefs;
         const start = this.state.start;
         const end = this.state.end;
         if(algo == "Bfs" || algo == "Default") Bfs(grid , start , end , myRef , speed);
         if(algo == "Dfs") Dfs(grid , start , end , myRef , speed);
         if(algo == "Dijikstra") Dijikstra(grid , start , end , myRef , speed);
         if(algo == "A*") AStar(grid , start , end , myRef , speed);
         
      }
      MouseUp = (e) =>{
            if(mouseClickedStart) mouseClickedStart = false;
            else if(mouseClickedEnd) mouseClickedEnd = false;
            else {
               console.log("Wall Creation ended");
               isWallClicked = false;
            }
      }
      
      render(){
         const grid = this.state.gridState;
         const myRef = this.state.myRefs;
         const start = this.state.start;
         const end = this.state.end;
         
       return(
      <React.Fragment>
         
         <Header  execute = {this.execute} clearBlocks = {this.clearBlocks} clearAnimation = {this.clearAnimation} clearPath = {this.clearPath.bind(this)}/>
         
         <Description></Description>
         
         <div className = "Info"><b>Pick an Algorithm and hit visualize. The default running algorithm is Breadth First Search</b></div>
         
         <div className = "Grid">
         <Square 
            grid = {this.state.gridState} 
            myRef = {this.state.myRefs}
            rows = {this.state.rows} 
            cols = {this.state.cols} 
            clickHandler = {this.clickHandler} 
            moveHandler = {this.moveHandler} 
            start = {this.state.start} 
            end = {this.state.end}
            MouseDown = {this.MouseDown}
            MouseMove = {this.MouseMove}
            MouseUp = {this.MouseUp}
         />
      </div>
      </React.Fragment>
      )}
}
export default visualizer;