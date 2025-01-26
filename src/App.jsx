import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card =({title}) => {
  return (
    <div className='card' >
      <h2>{title}</h2>{" "}
    </div>
  );
}
function App() {
  
  return (
    <>
      <div className='card-container'> 
        <Card title="spider-man" />
        <Card title="super-man" />
        <Card title="Iron-man" />
      </div>
    </>
  );
}


export default App
