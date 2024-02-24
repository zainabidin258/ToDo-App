import { useState } from "react";
import { supabase } from "./supabase";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = ({ setUser }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await supabase.from("users").select().eq('username',username).eq('password',password);
        console.log(data)
        if(data.length === 1){
            setUser(data);
            navigate('/dashboard');
        }
        else{
            toast.error('Username/password is incorrect.')
        }
    }

    return (
        <>
            <div>
                <h1 style={{ textAlign: "center", color: "#222222" }}>
                    Login
                </h1>
            </div>
            <div className="container " style={{
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'rgba(32, 32, 32, 0.08) 0px 10px 32px 0px',
                padding: '40px'
            }}>
                <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            height: '25px',
                            width: '50%',
                            padding: '10px 20px',
                            fontSize: '15px',
                            marginBottom: '10px',
                            outline: 'none',
                            borderRadius: '2px',
                            border: '1px solid rgb(209, 215, 217)'
                        }}
                    />

                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            height: '25px',
                            width: '50%',
                            padding: '10px 20px',
                            fontSize: '15px',
                            marginBottom: '10px',
                            outline: 'none',
                            borderRadius: '2px',
                            border: '1px solid rgb(209, 215, 217)'
                        }}
                    />

                    <button type="button" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;
