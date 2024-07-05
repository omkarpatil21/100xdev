import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import {atom} from 'recoil';

const countAtom = atom({
    key: "countAtom",
    default:0
})
function App() {
  return (
    <div>
          <RecoilRoot>
          <CountRenderer ></CountRenderer>
          </RecoilRoot>
    </div>
  )
}
function CountRenderer(){
  console.log("rerendered")
  return(
    <div>
      <Button ></Button>
      <Count></Count>
    </div>
  )
}
function Button(){
  const [count, setCount]=useRecoilState(countAtom)
  return(
    <div>
      <button onClick={()=>{setCount(count+1)}}>Increase</button>
      <button onClick={()=>{setCount(count-1)}}>Decrease</button>
    </div>
  )
}
function Count(){
  const count = useRecoilValue(countAtom);
  return (
    <div>
      {count}
    </div>
  )
}
export default App
