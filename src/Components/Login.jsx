import React, { useContext, useState } from 'react'
import './login.css'
import SupabaseContext from './SupabaseContext'
function Login() {

    const {supabase,setAuth}= useContext(SupabaseContext)
    const [register,setRegister]=useState(false)
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const handleSubmit =async  (e)=>{
        e.preventDefault()
        if(register){
            let { data, error } = await supabase.auth.signUp({
                email: username,
                password: password
              })
              if(error) alert(error)
            
            setRegister(false)
        }else{
            let { data, error } = await supabase.auth.signInWithPassword({
                email: username,
                password: password
              })
            if(error) alert(error)
            else{
                localStorage.setItem("User",JSON.stringify(data))
                setAuth(true)
            }

        }
    }
    
  return (
    <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label">Email: </label>
          <input
            type="text"
            name="username"
            className="input"
            placeholder="email"
            required={true}
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
          />
        </div>
        <div className="input-container">
          <label className="label">Password: </label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            required={true}
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <a onClick={(e)=>{setRegister(!register)}} className="link forgotten-password" style={{cursor:"pointer"}}>
            {
                !register ? 'Register' : 'Login'
            }
          </a>
        </div>
        <button type="submit" id="login-btn">
            {
                register ? 'Register' : 'Login'
            }
        </button>
      </form>
  )
}

export default Login