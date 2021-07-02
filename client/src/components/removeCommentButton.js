import React, {useState, useContext, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VariablesContext } from "../context/VariablesContext";

const useStyles = makeStyles({

  buttonRemove: {
    padding: 3,
    height: "fit-content",
        marginBottom: "5px",
        marginRight: 20,
        fontSize: 8,
  }
});

const RemoveComment = (props) => {
    const [data, setData] = useState([])
     let  { countComment,setCountComment } = useContext(VariablesContext);
    const [confirm, setConfirm] = useState(false)
    const [idButton, setIdButton] = useState("")
    let userId = localStorage.getItem("userId")
    let userCommentId = props.userID

    let commentId = props.commentId
    let petId = props.petID
    //console.log("petId",petId)

    let confirmation = () => {
        setConfirm(true)
    }
    let removeCountComment = () => {
        setCountComment(countComment -=1)
    }


        const deleteComment = ()=>{
        fetch(`http://localhost:5000/pets/deleteComment/${petId}/${commentId}`,{
            method:"delete",
           
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
             const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData) 
        }).catch(err=>console.log(err))
    }
    const classes = useStyles();
    
    let fetchAndRemove = () => {
        deleteComment();
        removeCountComment()
    }
    return (<div>
        {userId === userCommentId && <input type="button" value={"Remove"}
            className={classes.buttonRemove} onClick={fetchAndRemove} />}
        
    </div>)
}

export default RemoveComment
