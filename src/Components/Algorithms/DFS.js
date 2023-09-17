import animateCell from '../Animate/animate';
let result = [];
const Dfs = async(props , start , end , refArray , speed) =>{

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
    }
    for(let i = 0 ; i < matrixRows ; i++){
        for(let j = 0 ; j < matrixColumns ; j++){
            shortestPath[i][j] = false;
        }
    }
    let pathArray = [];
    let isVisited = false;
    
   await dfsHelper(grid , visited , st , en , pathArray , isVisited , refArray ,speed , matrixRows , matrixColumns);
    await pathPaint(result , refArray , speed);
    
}
const dfsHelper = async (grid , visited , st , en , pathArray , isVisited , refArray , speed , matrixRows , matrixColumns) =>{

        if(st.x < 0 || st.x >= matrixRows || st.y < 0 || st.y >= matrixColumns) return false;
    
        if(st.x == en.x && st.y == en.y)
        {
            console.log("Reached End" , st ,en);
            isVisited = true;
            result = pathArray;
            return true;
        }
        let i = st.x , j = st.y;
        if(grid[i][j] === -1 || visited[i][j]) return false;
        visited[i][j] = true;

        let temp = { x : i , y : j};
        await animateCell(temp , "Interm" , refArray , speed);
        let up = {x : i - 1 , y : j};
        let down = {x : i + 1 , y : j};
        let right = {x : i , y : j + 1};
        let left = {x : i , y : j -  1};
        let u  , d , r , l;
        pathArray.push([i , j]);
        u = await dfsHelper(grid , visited , up ,en ,pathArray , isVisited , refArray ,speed , matrixRows , matrixColumns);
        
        if(!u){
           
            
            d = await dfsHelper(grid , visited , down ,en ,pathArray , isVisited , refArray , speed , matrixRows , matrixColumns);
            
        }
        else return true;
        if(!d) {
            r = await dfsHelper(grid , visited , right ,en ,pathArray , isVisited , refArray , speed , matrixRows , matrixColumns);
          
        }
        else return true;
        if(!r){ 
            l = await dfsHelper(grid , visited , left ,en ,pathArray , isVisited , refArray , speed , matrixRows , matrixColumns);
                
        }
        else return true;
        if(!l)
        {
            pathArray.pop();
            return false;
        }
        return true;
}
const pathPaint =async (pathArr , refArray , speed) =>{

   console.log(pathArr);
     for(let i = 0 ; i < pathArr.length ; i++)
    {
        console.log(pathArr[i]);
        let r = pathArr[i][0];
        let c = pathArr[i][1];
        let temp = {x : r , y : c};
        await animateCell(temp , "Path Node" , refArray , speed);
    }
    return;
}
export default Dfs;