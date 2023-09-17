import React from 'react';
import './animate.css'
const  animateCell = async (cell , type , refArray , speed) =>{

   return new Promise(function(resolve, reject) {
    setTimeout(() =>{
        
        refArray[cell.x][cell.y].classList.add('animation_trigger');
        if(type == "Path Node"){
           refArray[cell.x][cell.y].classList.add('color_path');
        }
        resolve("Painted");
        
    },speed);
    
    });
    
    
}

export default animateCell;