import React from 'react'

export default function Minibloc(props) {
    return (
        <div className="minibloc" id={`minibloc ${props.name}`}>
            <img src={`/icons/${props.image}.png`} alt="icône"/>
            <h3> {props.name} </h3>
            <p> {props.count} </p>
        </div>
    )
}
