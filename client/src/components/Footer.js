import React from 'react'
export default function Footer() {
    let footerStyle = {
        display: "flex",
        flexDirection:"column",
     backgroundColor:" #ff8c00",
     background: "linear-gradient(62deg, #ff8c00 0%, #f7ce68 100%)",
     height: "10vh",
    width: "100%",
    position: "fixed",
    bottom: 0, 
    }
    let footerText = {
        display: "flex",
        justifyContent: "center",
        marginTop: 8,
       fontWeight:600
}

    return (<div style={footerStyle}><p style={footerText}> FindMyPet</p><p style={footerText}> | Created by Laura Tronchin |</p></div>)
}