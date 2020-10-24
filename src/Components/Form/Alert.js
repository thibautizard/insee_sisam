import React from 'react'
import { closeAlert } from "../../fonctions_front"

export default function Alert() {

    return (
        <div id="alert-form">
            <p id="alert-form__message"> </p>
            <div>
                <input type="button" className="button" value="Ok" onClick={closeAlert}/>
            </div>
        </div>
    )
}
