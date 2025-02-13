import { Outlet } from "react-router-dom";
import Navbar from "./layout/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
