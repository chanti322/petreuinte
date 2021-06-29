import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  textComment :{
    fontSize: 15,
    textAlign: "left",
    padding:7,
  },
  liComment: {
 
    borderBottom:"1px solid black",
  },
  avatarPic: {
    width: "30px",
    height: "30px",
    padding:7,
  },
  nameUserComm :{
    fontSize: 10,
    fontStyle:"italic"
  },
  buttonRemove: {
    padding: 2,
    height: "fit-content",
    marginBottom:"5px"
  }
});


const DisplayComment = (props) => {
  const classes = useStyles();
  const [same, setSame] = useState([])
  let  petComments  = props.petComments;
  console.log("petdisp ", petComments)

  return (<div style={{marginTop:10}}>
          <ul>
              {petComments !== undefined &&
                petComments.map(link =>
                  <li className={classes.liComment} key={link._id} ><div style={{ display: "flex", justifyContent:"space-around" }}>
                    <div  style={{display:"flex", flexDirection:"column"} }>
                      <img src={link.avatar} alt="avatar" className={classes.avatarPic} />
                      <p className={ classes.nameUserComm}>{link.username}</p>
                    </div>
                  
                    <p className={classes.textComment} >{link.text}</p>
                    <div style={{display:"flex",alignItems:"flex-end"}}>
                       <button  className={classes.buttonRemove}>Remove</button>
                    </div>
                   
                   </div></li>
                )
              }
            </ul>
    </div>)
}
export default DisplayComment