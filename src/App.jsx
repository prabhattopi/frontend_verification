import { useContext } from "react";
import "./App.css";
import Login from "./pages/Login";
import { AuthContext } from "./context/auth/AuthContext";
import Dashboard from "./pages/Dashboard";

function App() {
  const {currentUser}=useContext(AuthContext)
  return (
    <>
    {
      currentUser?.token?<Dashboard/>:<Login/>
    }

    </>
  );
}

export default App;
