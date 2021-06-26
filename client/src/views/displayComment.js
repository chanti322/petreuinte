import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";

const DisplayComment = (props) => {

  const [same, setSame] = useState([])
  let  id  = props.petId;
  console.log("id", id)
useEffect(()=>{
    const allCommentFetch = () => {
      fetch(`http://localhost:5000/pets/allComments`)
        .then(res =>  res.json() )
        .then(data => {
          console.log("data", data)
          setSame(data)
          
        })
    }
    allCommentFetch()
  }, [])
    return (<div></div>)
}
export default DisplayComment