import { useEffect , useState} from "react";

function useTodos(n)
{
  const [todos,setTodos] = useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    const value=setInterval(()=>{
      fetch('https://sum-server.100xdevs.com/todos')
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setTodos(data.todos);
      setLoading(true);
    })
    },n*1000)
    fetch('https://sum-server.100xdevs.com/todos')
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setTodos(data.todos);
      setLoading(true);
    })

    return ()=>{
      clearInterval(value);
    }
  },[n])

  return {todos,loading};
}


function App() {
  const {todos,loading}=useTodos(5);
  console.log(loading);
  return (<>
  {
  !loading?<div>loading..</div>:todos.map((todo) => <Todo key={todo.id} todo={todo}></Todo>)}
  </>
  )
}
function Todo({todo})
{
  return <div>
    {todo.title}
    <br />
   { todo.description}
  </div>
}
export default App
