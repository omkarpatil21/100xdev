import { useEffect , useState} from "react";

function useTodos()
{
  const [todos,setTodos] = useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    fetch('https://sum-server.100xdevs.com/todos')
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setTodos(data.todos);
      setLoading(true);
    })
  },[])

  return {todos,loading};
}


function App() {
  const {todos,loading}=useTodos();
  return (<>
  {loading?<div>loading..</div>:todos.map((todo) => <Todo key={todo.id} todo={todo}></Todo>)}
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
