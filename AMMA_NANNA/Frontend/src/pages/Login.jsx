import { useState , useContext } from "react"
import { AuthContext } from '../context/AuthContext'
import axios from "axios"

const Login = () => {
    const { login } = useContext(AuthContext)
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const handleLogin = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post('api/auth/login',{email , password})
            login(res.data)
        } catch(err){
            console.error("Login failed ", err)
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleLogin} className="p-4 bg-white shadow-md rounded">
          <h2 className="text-xl mb-4">Login</h2>
          <input className="border p-2 w-full mb-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="border p-2 w-full mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="bg-blue-500 text-white p-2 w-full" type="submit">Login</button>
        </form>
      </div>
    )    
} 

export default Login
