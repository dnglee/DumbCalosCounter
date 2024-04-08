"use client";

import Image from "next/image";
import SideBar from "./components/Sidebar";
import MacroStats from "./components/MacroStats";
import Container from "./components/Container";
import ListOfFoods from "./components/ListOfFoods";
import AddFood from "./components/AddFood";

export default function Home() {
  
  return (
    <div className="bg-base-100 drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content grid grid-flow-row auto-rows-max grid-cols-4 gap-4 gap-x-2 pt-32">
        
        <div className="col-start-2 col-span-4">
          <h1>Overview</h1>
          <MacroStats></MacroStats>
        </div>

        <div className="col-start-2 col-end-3">
          <h1>List Of Foods</h1>
          <ListOfFoods></ListOfFoods>
        </div>
    
        <div className="ol-start-3 col-end-4"> 
          <h1>Add Food</h1>
          <AddFood></AddFood>
        </div>


{/* 
        <Container>
            <AddFood></AddFood>
        </Container> */}
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
          
        </ul>
      </div>
    </div>
  );
}
