import {BrowserRouter,Routes, Route, useNavigate} from 'react-router-dom'
import { Suspense, lazy } from 'react'
const DashBoard = lazy(()=> import('./components/DashBoard'))
function App() {
  
  return (
    <div>
      {/* using window location causes calling backend and rerenders the whole page */}
      <button onClick={()=> {
        window.location.href="/"
      }}>Landing page</button>
      <button onClick={()=>{
        window.location.href="/dashboard"
      }}>dashboard</button>
      <BrowserRouter>
      {/* using useNavigate hook doesnt cause rerender */}
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/dashboard' element={<Suspense fallback={"loading"}><DashBoard/></Suspense>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
function Navbar(){
  const navigate=useNavigate();
  return(
    <div>
      <button onClick={()=> {
      navigate("/")
    }}>Landing page</button>
    <button onClick={()=>{
      navigate("/dashboard")
    }}>dashboard</button>
    </div>
  )
}
function Landing(){
  return(
    <div>
      Landing Page
    </div>)
}

export default App
