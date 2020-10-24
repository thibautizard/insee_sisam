import React from 'react'
import Suggestion from './Suggestion'

export function Suggestions(props) {

    let allSuggestions = props.listeSuggestions.map(suggestion => <Suggestion informations={suggestion} onClick={props.onClick}/>)
    console.log(allSuggestions)
    return <div className="list_suggestions"> {allSuggestions} </div>
}
