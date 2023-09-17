import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../Header/header.css';
import {Nav ,Navbar, NavDropdown} from 'react-bootstrap'
let algoToImpletment = "Default";
let Speed = 5;
let ClearBoard = false;
let ClearWall = false;

const header = (props) =>{
    
    return(
        <div className = "header">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <Navbar.Brand href="#home">Algorithm Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
         <Nav className="mr-auto">
             <NavDropdown style ={{marginLeft : 50}}title="Algorithms" id="collasible-nav-dropdown">
                <NavDropdown.Item  onClick ={()=>algoToImpletment = "Bfs"}>Breadth First Search Algorithm</NavDropdown.Item>
                <NavDropdown.Item  onClick ={()=>algoToImpletment = "Dfs"}> Depth First Search Algorithm</NavDropdown.Item>
                <NavDropdown.Item  onClick ={()=>algoToImpletment = "Dijikstra"}>Dijikstra Algorithm</NavDropdown.Item>
                <NavDropdown.Item  onClick ={()=>algoToImpletment = "A*"}>A* Search Algorithm</NavDropdown.Item>
            </NavDropdown>
        
            <NavDropdown style ={{marginLeft : 80}} title="Speed" id="collasible-nav-dropdown">
                <NavDropdown.Item onClick = {() => Speed = 5}>Fast</NavDropdown.Item>
                 <NavDropdown.Item onClick = {() => Speed = 20}>Medium</NavDropdown.Item>
                 <NavDropdown.Item onClick = {() => Speed = 50}>Slow</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link style ={{marginLeft : 100}} onClick ={()=>props.execute(algoToImpletment , Speed , ClearBoard ,ClearWall)}>Visualize</Nav.Link>

            <Nav.Link style ={{marginLeft : 100}} onClick = {()=>{props.clearAnimation(true)}}>Clear Board</Nav.Link>

            <Nav.Link style ={{marginLeft : 100}} onClick = {()=>{props.clearBlocks()}}>Clear Walls</Nav.Link>

            <Nav.Link style ={{marginLeft : 100}} onClick = {()=>{props.clearPath()}}>Clear Path</Nav.Link>
         </Nav>
        </Navbar.Collapse>
        </Navbar>
        </div>
    )
}

export default header;