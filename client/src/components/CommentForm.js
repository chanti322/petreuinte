import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({

  commentBtn: {backgroundColor:"orange", padding:5, borderRadius: 4, marginLeft:7, fontStyle:"italic"}
});


const Comment = (props) => {
       const classes = useStyles();
    const [text , setText] = useState("")
    const [data, setData] = useState([])
    const avatar = localStorage.getItem("userAvatar");
  //  console.log("avatarCommForm", avatar)
    const username = localStorage.getItem("usernameStorage")
     // console.log("nameCommForm", username)
    let petId = props.petId
   // console.log("petIdcomm", petId)
    //console.log("commText",text)
   /*  const handleChange = (e) => {
        e.preventDefault();
        setText(e.target.value)
        console.log("comment", text)
        
    } */

    let commentFetch = () => {
        fetch("http://localhost:5000/pets/comments", {
            method: "put",
            headers: {
                "Content-Type":"Application/json"
            },
             body: JSON.stringify({
                petId,
                 text,
                 avatar,
              username,
        }),
        }).then(res => res.json())
            .then((data) => {
            console.log("commentdata",data)
        })
    } 

    /* const commentFetch = (text,postId)=>{
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
    } */
    return (
        <div>
            <input style={{marginTop:10, marginBottom: 15, width:"60%", padding:7}} type="text" placeholder="add a comment" value={text}  onChange={(e) => setText(e.target.value)} />
            <button className={classes.commentBtn} onClick={commentFetch}>Send</button>
        </div>
        
    )
    
       
    
   
}
            export default Comment;

  {/*   {data ?
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
        </div> */}