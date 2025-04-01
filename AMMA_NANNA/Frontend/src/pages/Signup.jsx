import { useState , useContext } from "react"
import { AuthContext } from '../context/AuthContext'
import axios from "axios"

const Signup = () => {
    const { signup } = useContext(AuthContext)
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")

    const handleSignup = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post('api/auth/signup',{email , password})
            signup(res.data)
        } catch(err){
            console.error("Signup failed ", err)
        }
    }
    return (
        <form onSubmit={handleSignup}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Signup</button>
        </form>
    )    
} 

export default Signup
