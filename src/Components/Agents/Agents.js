/*
IMPORTATION DES COMPOSANTS
*/

import React from 'react'
import Search from '../Search/Search'
import Table from '../Table/Table'
import AddAgent from '../Form/add_agent'
import EditAgent from '../Form/edit_agent'
import Alert from '../Form/Alert'
import HeaderOrder from './HeaderOrder'
import Loader from '../Loader/Loader'


/*
IMPORTATION DES FONCTIONS ET DES STYLES
*/

import { getTables, effectTransition, later, scrollCaptionEffect} from '../../fonctions_front'

/*
############################
##        TABLEAU         ##
############################
*/

export default class Tableau extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: "",
            data: {},
            isLoaded: false,
        }
    }

    componentDidMount() {
        later(800)
        .then(() => getTables(this.props.defaultTable, false))
        .then(({tables, data}) => this.setState({ tables, data, isLoaded: true }))
    }
    
    handleClickIcon = (e, join = false) => {

        let parent = e.target.parentNode
        let [table, icon] = [parent.id, parent.querySelector(".icon")]
        
        document.querySelectorAll(".icon").forEach(icon => icon.classList.replace("icon--active", "icon--inactive"))
        icon.classList.toggle("icon--active")

        document.querySelectorAll(".jointure").forEach(jointure => jointure.classList.replace("jointure--active", "jointure--inactive"))
        if(join) e.target.classList.replace("jointure--inactive", "jointure--active")        

        const scrollX = document.getElementById("scrollX")
        effectTransition(scrollX, "fade-out-down")

        later(1000)
        .then(() => this.setState({isLoaded:false}))
        .then(() => getTables(table, join))
        .then(({tables, data}) => this.setState({ tables, data, isLoaded: true }))
        .then(() => effectTransition(scrollX, "fade-in-up"));

    }
 

    render() {


        return (
                      
            <div id="content">

                <AddAgent/>
                <EditAgent/>
                <Alert/>
                <HeaderOrder/>
                <div id="grey_cover"></div>
                
                <div id="scrollY">

                    <Search famille={this.props.famille}
                            onClickIcon={this.handleClickIcon} 
                            onClickJointure={this.handleClickJointure}/>

{this.state.isLoaded ?
                    <div id="scrollX" 
                         onScroll={scrollCaptionEffect} 
                         className="fade-in-up"> 

                    {this.state.tables.map(subTable => 

                    <Table subtable = { {...subTable, ...this.state.data}}/>

                    )}

                    </div>
:<Loader/>}

                </div>
                
            </div>
               
        )
    }
}
