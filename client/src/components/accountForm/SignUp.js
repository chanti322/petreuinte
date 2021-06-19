import React,{useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import "../../styles/SignUpForm.css";
//import M from 'materialize-css'
const SignUp  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
     const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "find-pet");
    data.append("cloud_name", "cloulau");
    fetch("https://api.cloudinary.com/v1_1/cloulau/image/upload", {
      method: "POST",
      body: data,
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
         //   M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:5000/users/signUp",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            //  M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
             //  M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signUp')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
       
    }

   return (
     <div className="container">
       <div className="app-wrapper">
          <div className="card auth-card input-field">
              <h2 className="welcome">Welcome!</h2>
          <h2 className="title">Create an Account</h2>
        </div>
       <input
          className="input"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
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
            onChange={(e)=>setPassword(e.target.value)}
            />
            <div>
            <div >
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div >
                <input  className="input" type="text" />
            </div>
            </div>
            <button  className="submit"
            onClick={()=>PostData()}
            >
                SignUp
            </button>
            <h5>
                <Link to="/signInForms">Already have an account ?</Link>
            </h5>
             
               
         
            
    </div>
        </div>
     // </div>
   )
}


export default SignUp
