import React, {useState, useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    const [confirm, setConfirm] = useState(false)
    const [idButton, setIdButton] = useState("")
    let userId = localStorage.getItem("userId")
    let userCommentId = props.userID

    let commentId = props.commentId
   

    let confirmation = () => {
        setConfirm(true)
    }


        const deleteComment = ()=>{
        fetch(`http://localhost:5000/pets/deleteComment/${commentId}`,{
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
    return (<div>
        {userId === userCommentId && <input type="button" value={"Remove"}
            className={classes.buttonRemove} onClick={deleteComment} />}
        
    </div>)
}

export default RemoveComment
