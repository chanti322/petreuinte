import React, { useState } from "react";


const Comment = (props) => {
    const [text, setText] = useState("")
    const [data,setData] = useState([])
    let petId = props.petId
    console.log("petIdcomm", petId)
   /*  const handleChange = (e) => {
        e.preventDefault();
        setText(e.target.value)
        console.log("comment", text)
        
    } */

   /*  let commentFetch = () => {
        fetch("http://localhost:5000/pets/comments", {
            method: "POST",
            headers: {
                "Content-Type":"Application/json"
            },
             body: JSON.stringify({
                 petId,
                 text,
        }),
        }).then(res => res.json())
            .then((data) => {
            console.log("comment",data)
        })
    } */

    const commentFetch = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    return (
        <div>
            {data ?
        data.map(item => {
            return (

                <div>
                       {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}> {record.text}</h6>
                                        )
                                    })
                                }
                    <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    commentFetch(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
      
                </div>)
        })
    :  <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    commentFetch(e.target[0].value)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>}
        </div>
    )
    
       
    
   
}
export default Comment;