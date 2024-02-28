"use client";

import Image from "next/image";
import SideBar from "./components/Sidebar";
import MacroStats from "./components/MacroStats";

export default function Home() {
  
  return (
    <div className="bg-base-100 drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="flex min-h-screen items-start justify-right p-24">
          <MacroStats></MacroStats>
        </div>
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
