import React from 'react';
import { Link } from 'react-router-dom';
import "./VendingMachine.css"

function VendingMachine() {
  return (
    <div className="vending-machine">
      <div className='VendingMachine-p'>
         <p>HELLO I AM A VENDING MACHINE. WHAT WOULD YOU LIKE TO EAT</p>
      </div>
      <div className='VendingMachine-link'>
        <ul>
            <li><Link to="/soda">Soda</Link></li>
            <li><Link to="/chips">Chips</Link></li>
            <li><Link to="/sardines">Sardines</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default VendingMachine;
