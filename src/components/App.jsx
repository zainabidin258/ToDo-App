import { Routes, Route} from "react-router-dom";
import { useState } from "react";
import Login from "./Login"
import Dashboard from "./Dashboard";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [user, setUser] = useState([]);

  return (
      <>
        <ToastContainer />
        <Routes>
          
            <Route path="/" element = {<Login setUser={setUser} />}
            />
            <Route path="/dashboard" element = {<Dashboard user={user} setUser={setUser} />} 
            />
        </Routes>
      </>
  )
}

export default App