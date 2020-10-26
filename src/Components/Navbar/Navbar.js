import React from 'react';
// import logo from '../../logo.png';

export default function Navbar() {

     
    function navClass(test) {
        const path = String(window.location).split("/")
        return path[path.length - 1] === test ? `nav_link nav_link--${test} nav_link--active` : `nav_link nav_link--${test}`
    }


        return (
            <nav>
                <a href="/"> <p className="link-home demo"> SISAM </p> </a>
                <div className="nav_links">
                    <a href="/agents" className={navClass("agents")}> Agents </a>
                    <a href="/bureaux" className={navClass("bureaux")}> Bureaux </a>
                    <a href="/directions" className={navClass("directions")}> Directions </a>
                    <a href="/mobilites" className={navClass("mobilites")}> <span style={{marginRight:".7vw"}}>🔧</span> Mobilites </a>
                </div>
                <a href="mailto:thibaut.izard@insee.fr?subject=Version démo de SISAM"><button> Contact </button></a>
            </nav>
        )
    }


// TEST À REVOIR POUR L'AJOUT D'UNE BARRE GLISSANTE SOUS LES ITEMS DE NAVIGATION

/*

export default function Navbar() {
    alert("it renders!")
    const [renderCount, setRenderCount] = useState(0);
    
    function increment() {
        setRenderCount(prevCount => {
            prevCount = prevCount + 1;
        })
    }

    useEffect(() => {
    }, [renderCount])

    const barre = document.getElementById('under_nav');
    let path = String(window.location).split('/')[3];
    let target = document.getElementById(`nav_agents`);
    
    
    let left = target.offsetLeft;
    let width = parseInt(getComputedStyle(target).width);
    barre.style.left = `${left}px`;
    barre.style.width = `${width}px`;

    function slideBar(e) {
        let target = e.currentTarget;
        
        let left = target.offsetLeft;
        let width = parseInt(getComputedStyle(target).width);
        barre.style.left = `${left}px`;
        barre.style.width = `${width}px`;
    }

    return (
        <header id="navBar">
                <a href="/accueil"> <p> SI•SAME </p> </a>
                <nav>
                    <ul className="nav_links">
                        <li id="nav_agents" className="nav_link" onClick={increment}> <a href="/agents"> Agents </a> </li>
                        <li id="nav_bureaux" className="nav_link" onClick={increment}> <a href="/bureaux"> Bureaux </a> </li>
                        <li id="nav_directions" className="nav_link" onClick={increment}> <a href="/directions"> Directions </a> </li>
                        <li id="nav_mobilite" className="nav_link" onClick={increment}> <a href="/mobilite"><span role="img" aria-label="clef molette">🔧</span> Mobilités </a> </li>
                        <li id="nav_tables" className="nav_link" onClick={increment}> <a href="/tables"><span role="img" aria-label="clef molette">🔧</span> Tables</a> </li>
                        <div id="under_nav"></div>
                    </ul>
                </nav>
                <button> Contact </button>
        </header>
    )
}

*/