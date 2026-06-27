import React from "react"
import { useState } from "react"


function App() {
  const [count, setCount] = useState(0)

  const increase = () => {
    setCount(count+1)
  }

  return (
    <div>
    <h1 className="bg-amber-300 text-black">{count}</h1>
    <button onClick={increase}> increase </button>
     </div>
  )
}

export default App
