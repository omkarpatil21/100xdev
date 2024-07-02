import { createContext,useContext, useState } from "react"

const Countcontext= createContext(
  {count: 0,
      setCount: () => {}, }
);
function App() {
  const [count, setCount]=useState(0)
  return (
    <div>
        <Countcontext.Provider value={{count,setCount}}>
          <CountRenderer ></CountRenderer>
        </Countcontext.Provider>
    </div>
  )
}
function CountRenderer(){
  return(
    <div>
      <Button ></Button>
      <Count></Count>
    </div>
  )
}
function Button(){
  const {count,setCount}=useContext(Countcontext);
  return(
    <div>
      <button onClick={()=>{setCount(count+1)}}>Increase</button>
      <button onClick={()=>{setCount(count-1)}}>Decrease</button>
    </div>
  )
}
function Count(){
  const {count}=useContext(Countcontext);
  return (
    <div>
      {count}
    </div>
  )
}
export default App
