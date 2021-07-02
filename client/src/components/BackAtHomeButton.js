import React, {useState} from "react"

export default function BackAtHome(props) {
    let userIdOfThePost = props.userIdOfThePost
    let petId= props.petId
    let userId = localStorage.getItem("userId")
    const [inSavePet, setInSavePet] = useState(false)
    let inSaveTrue = () => {
    setInSavePet(true)
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
    let addSaveAndFetch =  () => {
  inSaveTrue()
        inSaveFetch()
    }
    //Style
    let buttonStyle = {
        backgroundColor: "green",
        padding: 5,
        borderRadius: 5,
       marginLeft:30,
        color:"white"
            
    }
    return (<div>  {userId ===userIdOfThePost && <button onClick={addSaveAndFetch } style={buttonStyle}>Back at home</button>}  </div>)
   
}