                                                                                                                                /*
                                            DESCRIPTION

 Espace de recherche situé en haut des pages des visualisation comprenant 
 (i) une barre de recherche par nom
 (i) une série d'icônes équipées de liens permettant de naviguer entre les différentes tables de la base de données
                                                                                                                                */

import React from 'react'
import { handleSearchBar, handleClickLabel, tablesAndLabels, jointure } from '../../fonctions_front'


export default function Search(props){

        let { tables, etiquettes } = tablesAndLabels(props.famille)
        return(

            <div className="search-container fade-in-down">

                {/* BARRE DE RECHERCHE */}
                <div className="searchbar">
                    <input onChange={handleSearchBar} type="text" className="searchbar__input" placeholder="Recherche par nom..." />   
                    <svg className="searchbar__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                </div>

                {/* ÉTIQUETTES */}
                <div className="labels">
                {etiquettes.map((etiquette, i) => 
                    (<div className="label" onClick={() => handleClickLabel(etiquette.action)}>
                            <p className="label__text"> {etiquette.name} </p>
                            <img src={`/icons/${etiquette.action}.png`} alt="icône"/>
                    </div>)
                )}
                </div>

                {/* ICONES */}
                <div className="icons">
                    {tables.map((table, index) =>
                    (<div className="icon-group" id={table.table}>
                        <img src={`/icons/${table.path}.png`} className={`icon ${index === 0 && "icon--active"}`} alt="" onClick={e => props.onClickIcon(e, false)}/>
                        <p className="icon-caption"> {table.name} </p>
                        <p className="jointure jointure--inactive" onClick={e => props.onClickIcon(e, true)}> Jointure </p>
                    </div>)

                    )}
                </div>

            </div>
            
        )
}
