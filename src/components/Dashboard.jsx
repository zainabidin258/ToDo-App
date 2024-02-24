import { useEffect, useState } from "react";
import Table from "./Table";
import { supabase } from "./supabase";
import Logo from "../assets/todoLogo.png";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user, setUser }) => {
  const [flag, setFlag] = useState(true);
  const [data, setData] = useState();
  const navigate = useNavigate();

  async function getTasks() {
    const { data } = await supabase.from("Tasks").select();
    setData(data);
  }
  useEffect(() => {
    getTasks();
  }, [flag]);

  useEffect(() => {
    if(!user.length)
        navigate('/')
}, [user])

  return (
    <div className="main bg-gray-800 text-white h-screen">
      <div className="flex gap-x-4 items-center p-5">
        <img
          className="h-[100px] w-[150px] items-center"
          src={Logo}
          alt="logo"
        />
        <div className="text-teal-600 text-2xl font-semibold">Todo list</div>
        <div className="flex-1"></div>
        <div className="text-teal-600 font-semibold">{user.length && user[0].username}</div>
        <button className="border-2 bg-teal-600 font-semibold text-white border-slate-300 p-2 rounded-md" onClick={() => setUser([])}>
          Logout
        </button>
      </div>
      {/*main container  */}
      <div className="flex gap-x-4">
        <div className="bg-teal-600 p-5 rounded-r-2xl rounde">
          <div className="text-2xl">Dashboard</div>
          <ul className="list-disc pl-5 pt-3">
            {data &&
              data.map((task) => (
                <li key={task.id} className="text-xl">
                  {task.title}
                </li>
              ))}
          </ul>
        </div>
        <Table flag={flag} setFlag={setFlag} />
      </div>
    </div>
  );
};

export default Dashboard;
