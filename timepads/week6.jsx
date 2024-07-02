import { useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
//import { Todo } from './components/Todo'
import { useRef,useEffect } from 'react'
var count1=0;
function Assignment2() {
  const [count, setCount] = useState(0);

  const numberOfTimesReRendered = useRef(0);

  const handleReRender = () => {
      // Update state to force re-render
      setCount(count + 1);
  };
  count1++;
  numberOfTimesReRendered.current = numberOfTimesReRendered.current + 1;

  return (
      <div>
          {count1}
          <p>This component has rendered {numberOfTimesReRendered.current} times.</p>
          <button onClick={handleReRender}>Force Re-render</button>
      </div>
  );
}

function App() {
  const [id,setId]=useState(1);
 // const [title,setTitle] = useState("")
  
  return (
    <div>
      <Assignment2></Assignment2>
      <button key = {1} onClick={()=>{setId(1)}}>1</button>
      <button key = {3} onClick={()=>{setId(2)}}>2</button>
      <button key = {4} onClick={()=>{setId(3)}}>3</button>
      <button key = {2 }onClick={()=>{setId(4)}}>4</button>
      <Todo id={id}></Todo>
    </div>
  )
}
function Todo(props){
  
  const [todo, setTodo] = useState({})
  useEffect(function(){
    fetch("https://sum-server.100xdevs.com/todo?id="+props.id)
  .then(async function(response){
    const json= await response.json();
    console.log(json.todo);
    setTodo(json.todo)
  })
  },[props.id])
  return <>
    <h1>{todo.title}</h1>
    <h2>{todo.description}</h2>
  </>
}
export default App
