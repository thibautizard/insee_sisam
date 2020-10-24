import React from 'react'
import {selectOrDeselectRows, changeRowsColor, filterHeaders, deselectAllRowsWhenClickingDocument } from '../../fonctions_front'

export default function Table(props) {

    let { name, color, subheaders } = props.subtable
    let { rows, headers } = props.subtable
    
    deselectAllRowsWhenClickingDocument()

    return (

        <div className="tab-container">
            
        <table key={name}> 

            {/* TITRE TABLE */}
            <caption className={`${color} table__caption`}> 
                <div style={{color, backgroundColor:color}}>|</div>
                <span className="titleTable"> {name} </span> 
            </caption> 

            {/* HEADER */}
            <thead>
                <tr style={{backgroundColor: color}}>
                {subheaders.map((header, i) => <th 
                                                key={i} 
                                                id={`${name}_${header}`}
                                                onClick={e => filterHeaders(e, headers, header)}> 
                                                {header} 
                                                </th>)}
                </tr>
            </thead>

            {/* BODY */}
            <tbody>
                {rows.map((row, i) => <tr 
                                        data-key={i} 
                                        data-color={color}
                                        className={`${row["idAgent"]}, ${row["idBureau"]}`}  
                                        onClick={selectOrDeselectRows}
                                        onMouseOver={changeRowsColor}
                                        onMouseOut={changeRowsColor}
                                        > 
                                        
                    {subheaders.map((header, j) => <td 
                                                    key={j}
                                                    header={header}
                                                    > 
                                                    
                                                    {row[header]} 
                                                    
                                                    </td>)} 
                                        </tr>)}
            </tbody>

        </table>
    </div>
    )

}