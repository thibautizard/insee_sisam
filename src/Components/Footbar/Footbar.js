import React from 'react'
import './Footbar.css'

export default function Footbar(props) {

    let famille = props.famille === "Agents" ? "agents" : "bureaux"; 
    return (
        <div id="footbar" className="fade-in-up">
            <p> {props.number} {famille} |</p>
            <p> {`${Date.now()}`} |</p>
        </div>
    )
}
