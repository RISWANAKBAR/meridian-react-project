import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Userblog from "./Components/Userblog";
import Allblogs from "./Components/Allblogs";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userblog/:userId" element={<Userblog />} />
          <Route path="/allblogs" element={<Allblogs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
