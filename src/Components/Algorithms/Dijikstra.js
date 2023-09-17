import animateCell from '../Animate/animate';

function minHeap() {
	this.heap = [];
	this.isEmpty = function(){
		return (this.heap.length == 0);
	}
	this.clear = function(){
		this.heap = [];
		return;
	}
	this.getMin = function(){
		if (this.isEmpty()){
			return null;
		}
		var min = this.heap[0];
		this.heap[0] = this.heap[this.heap.length - 1];
		this.heap[this.heap.length - 1] = min;
		this.heap.pop();
		if (!this.isEmpty()){
			this.siftDown(0);
		}
		return min;
	}
	this.push = function(item){
		this.heap.push(item);
		this.siftUp(this.heap.length - 1);
		return;
	}
	this.parent = function(index){
		if (index == 0){
			return null;
		}
		return Math.floor((index - 1) / 2);
	}
	this.children = function(index){
		return [(index * 2) + 1, (index * 2) + 2];
	}
	this.siftDown = function(index){
		var children = this.children(index);
		var leftChildValid = (children[0] <= (this.heap.length - 1));
		var rightChildValid = (children[1] <= (this.heap.length - 1));
		var newIndex = index;
		if (leftChildValid && this.heap[newIndex][0] > this.heap[children[0]][0]){
			newIndex = children[0];
		}
		if (rightChildValid && this.heap[newIndex][0] > this.heap[children[1]][0]){
			newIndex = children[1];
		}
		// No sifting down needed
		if (newIndex === index){ return; }
		var val = this.heap[index];
		this.heap[index] = this.heap[newIndex];
		this.heap[newIndex] = val;
		this.siftDown(newIndex);
		return;
	}
	this.siftUp = function(index){
		var parent = this.parent(index);
		if (parent !== null && this.heap[index][0] < this.heap[parent][0]){
			var val = this.heap[index];
			this.heap[index] = this.heap[parent];
			this.heap[parent] = val;
			this.siftUp(parent);
		}
		return;
	}
}

const Dijikstra = async(props , start , end , refArray , speed) =>{

    let heap = new minHeap();
    let st = {x : start[0] , y : start[1]};
    let en = {x : end[0] , y : end[1]};
    let grid = props;
    let matrixRows = grid.length;
    let matrixColumns = grid[0].length;
    let visited = [];
    let shortestPath = [];
    let pathExists = false;
    let distance = [];
    for(let i = 0 ; i < matrixRows ; i++){
        visited.push(Array.from(Array(matrixColumns) , () => false));
        shortestPath[i] = new Array(matrixColumns);
        distance[i] = new Array(matrixColumns);
    }
    for(let i = 0 ; i < matrixRows ; i++){
        for(let j = 0 ; j < matrixColumns ; j++){
            shortestPath[i][j] = false;
            distance[i][j] = Number.POSITIVE_INFINITY;
        }
    }
    distance[st.x][st.y] = 0;
    heap.push([ 0 , [st.x , st.y]]);
    while(!heap.isEmpty()){

        var cell = heap.getMin();
		var i = cell[1][0];
        var j = cell[1][1];
        if (visited[i][j]){ continue; }
		visited[i][j] = true;
		if (i == en.x && j == en.y){
			pathExists = true;
			break;
		}
		var neighbors = getNeighbours(i, j , matrixRows , matrixColumns);
        console.log(neighbors);
        for (var k = 0; k < neighbors.length; k++){
			var m = neighbors[k][0];
			var n = neighbors[k][1];
			if (visited[m][n] || grid[m][n] == -1){ continue; }
			var newDistance = distance[i][j] + 1;
			if (newDistance < distance[m][n]){
				distance[m][n] = newDistance;
				shortestPath[m][n] = [i, j];
				heap.push([newDistance, [m, n]]);
                let temp = {x : m , y : n};
                await animateCell(temp , "Interm" , refArray , speed);
			}
        }
    }
    if(pathExists){

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
export default Dijikstra;
