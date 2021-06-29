import React, {useState} from 'react';
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

const RemoveComment = (prop) => {
    const [data, setData] = useState([])
    const [confirm, setConfirm]= useState(false)
    let commentId = prop.commentId
    console.log("commIdRem", commentId)

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
        <button className={classes.buttonRemove} onClick={deleteComment}>Remove</button>
        
    </div>)
}

export default RemoveComment
