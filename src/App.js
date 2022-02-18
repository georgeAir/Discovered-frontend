import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Playlists from './comps/Playlists'
import Login from './comps/Login'

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return (
    <div className="App">
      <Playlists/>
      <Login/>
    </div>
  );
}

// function App() {
//   return code ? <Dashboard code={code} /> : <Login />
// }
export default App;
