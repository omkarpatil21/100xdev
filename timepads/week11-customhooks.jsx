import { useEffect , useState} from "react";

function useTodos()
{
  const [todos,setTodos] = useState([]);

  useEffect(()=>{
    fetch('https://sum-server.100xdevs.com/todos')
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setTodos(data.todos);
    })
  },[])

  return todos;
}


function App() {
  const todos=useTodos();
  return (<>
  {todos.map((todo) => <Todo key={todo.id} todo={todo}></Todo>)}
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
