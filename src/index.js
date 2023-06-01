//import React from 'react';
import ReactDOM from 'react-dom/client';
//import React, { useState, useEffect } from "react";
import Tablero from './tablero';
//import axios from "axios";

/*
<ObtenerFecha/>

function ObtenerFecha(){
  const [toggledOn, setToggledOn] = useState(new Date());

  useEffect(() => {
    let timerID = setInterval(() => setToggledOn(new Date()), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (<h2>La fecha es {toggledOn.toLocaleTimeString()}.</h2>);  
}
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Tablero/>
);
