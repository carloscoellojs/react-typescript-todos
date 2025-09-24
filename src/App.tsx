import { Outlet } from "react-router";
import "./App.css";
import Nav from "./layout/nav/Nav";

function App() {
  return (
    <div>
      <div className="nav">
        <Nav />
      </div>
      <div className="body w-full max-w-md mx-auto md:max-w-xl">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
