import React from 'react';
import '../Description/description.css';
const Description = () =>{

         return(
        <div className = "row">
            <div className= "block start"></div>
            <div>Start Node</div>
            <div className= "block end"></div>
            <div>End Node</div>
            <div className= "block visited"></div>
            <div>Visited Node</div>
            <div className= "block path"></div>
            <div>Path Node</div>
            <div className="block wall"></div>
            <div>Wall</div>
        </div>
        )
  
}

export default Description;