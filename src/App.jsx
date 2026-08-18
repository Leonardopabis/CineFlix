import { Aside } from "./components/Aside"
import './App.css'
import { Main } from "./components/Main"

function App() {
  return (
    <>
    <div className="contentContainer">
      <Aside />
      <Main/>
    </div>
    </>
  )
}

export default App
