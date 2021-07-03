import React, { useState, useContext } from "react"
import { VariablesContext } from "../context/VariablesContext";

export default function BackAtHome(props) {
    let userIdOfThePost = props.userIdOfThePost
    let petId = props.petId
    let petInSave =props.inSave
    let userId = localStorage.getItem("userId")
    const [inSavePet, setInSavePet] = useState(true)
    const [showCheck, setShowCheck] = useState(false)
    let  { countInSave,setCountInSave } = useContext(VariablesContext);
    
    let inSaveTrue = () => {
        setInSavePet(true)
  
    }
    let addCount = () => {
              setCountInSave(countInSave +=1)
    }
    let showCheckText = () => {
        setShowCheck(true)
    }
    let hideCheckText = () => {
        setShowCheck(false)
    }
    let inSaveFetch = () => {
        fetch("http://localhost:5000/pets/atHome", {
            method: "put",
            headers: {
                "Content-Type":"Application/json"
            },
             body: JSON.stringify({
                 inSavePet,
                 petId
        }),
        }).then(res => res.json())
            .then((data) => {
            console.log("InSavedata",data)
        })
    }
  function  addSaveAndFetch ()  {
//inSaveTrue()
      inSaveFetch()
       addCount()
    }
    //Style
    let buttonStyle = {
        backgroundColor: "green",
        padding: 5,
        borderRadius: 5,
       marginLeft:30,
        color:"white"
            
    }
    let buttonYes = {
        padding: 5,
        fontWeight:"bold",
        margin: 5,
        marginRight:25,
        color:"green"
    }
    let buttonNo = {
        padding: 5,
           fontWeight:"bold",
        margin: 5,
        color:"red"
    }
    return (<div>  {userId === userIdOfThePost && !petInSave && <button onClick={showCheckText} style={buttonStyle}>Back at home</button>}
         {showCheck && <div>
           <p style={{margin:10}}>Is it your Pet back at home?</p> 
            <button style={buttonYes} onClick={addSaveAndFetch}>
Yes
            </button>
            <button style={buttonNo} onClick={hideCheckText}>No</button>
        </div>} </div>)
   
}