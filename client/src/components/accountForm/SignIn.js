import React, { useState } from 'react'
import "../../styles/SignUpForm.css";
export default function SignIn() {
    const [email, setEmail] = useState()
     const [password, setPassword] = useState()
    return (<div>
       <input
          className="input"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
       <input
          className="input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
  </div>)  
}