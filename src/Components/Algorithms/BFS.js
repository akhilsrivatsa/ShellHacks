//import React from 'react';
import Queue from 'queue-fifo';
import animateCell from '../Animate/animate';
const Bfs = async(props , start , end , refArray , speed)=>{
        
    console.log("fghfgh");
    let queue = new Queue();
    let st = {x : start[0] , y : start[1]};
    let en = {x : end[0] , y : end[1]};
    let grid = props;
    let matrixRows = grid.length;
    let matrixColumns = grid[0].length;
    let visited = [];
    let shortestPath = [];
    let pathExists = false;
    for(let i = 0 ; i < matrixRows ; i++){
        visited.push(Array.from(Array(matrixColumns) , () => false));
        shortestPath[i] = new Array(matrixColumns);
       // shortestPath.push(Array.from(Array(matrixColumns) , () => false));
    }
    for(let i = 0 ; i < matrixRows ; i++){
        for(let j = 0 ; j < matrixColumns ; j++){
            shortestPath[i][j] = false;
        }
    }
    
    visited[Number(st.x)][Number(st.y)] = true;
    ;
    await animateCell(st , "start" , refArray , speed); 
    queue.enqueue(st);
    
    while(!queue.isEmpty())
    {
        
        let current = queue.peek();
        queue.dequeue();
        if(current.x === en.x && current.y === en.y) {
            console.log("End");
            pathExists = true;
            break;
        }
        let neighbours = getNeighbours(current.x , current.y , matrixRows , matrixColumns);
        for( let i = 0 ; i < neighbours.length ; i++)
        {
                let r = Number(neighbours[i][0]);
                let c = Number(neighbours[i][1]);

                if(visited[r][c] || grid[r][c] === -1) continue;
                visited[r][c] = true;
                shortestPath[r][c] = [Number(current.x) , Number(current.y)];
                let temp = { x : r , y : c};
                await animateCell(temp , "Interm" , refArray , speed);
                if(en.x == r && en.y == c){
                    pathExists = true;
                    break;
                }
                queue.enqueue(temp);
        }
        if(pathExists) break;
    }
    if(pathExists)
    {
        let r = Number(en.x) , c = Number(en.y);
        let temp;
        let n1 , n2;
        
       while(shortestPath[r][c] !== false){
            temp = { x : r , y : c};
            await animateCell(temp , "Path Node" , refArray , speed);
            n1  = shortestPath[r][c][0];
            n2 = shortestPath[r][c][1];
            r = n1;
            c = n2;
        }
            
            temp = {x : r , y : c};
            await animateCell(temp , "Path Node" ,refArray , speed)
        }
}
const getNeighbours = (i , j , totalRows , totalCols) =>{
    
    let neighbours = [];
    if ( i > 0 ){ neighbours.push( [i - 1, j] );}
	if ( j > 0 ){ neighbours.push( [i, j - 1] );}
	if ( i < (totalRows - 1) ){ neighbours.push( [i + 1, j] );}
	if ( j < (totalCols - 1) ){ neighbours.push( [i, j + 1] );}
	return neighbours;
}
export default Bfs;