import React from "react";
import "./Search.css"

const Search = ({item, setItem}) => {
    const [search, setSearch] = React.useState("");

    React.useEffect(()=> {console.log("search", search);setItem && setItem(search);}, [search])
    return (
    <>
    <div id="search">
	    <svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
		    <rect className="bar"/>
            <g className="magnifier">
                <circle className="glass"/>
                <line className="handle" x1="32" y1="32" x2="44" y2="44"></line>
            </g>
            {/* <g className="sparks">
                <circle className="spark"/>
                <circle className="spark"/>
                <circle className="spark"/>
            </g> */}
            {/* <g className="burst pattern-one">
                <circle className="particle circle"/>
                <path className="particle triangle"/>
                <circle className="particle circle"/>
                <path className="particle plus"/>
                <rect className="particle rect"/>
                <path className="particle triangle"/>
            </g>
            <g className="burst pattern-two">
                <path className="particle plus"/>
                <circle className="particle circle"/>
                <path className="particle triangle"/>
                <rect className="particle rect"/>
                <circle className="particle circle"/>
                <path className="particle plus"/>
            </g> */}
            {/* <g className="burst pattern-three">
                <circle className="particle circle"/>
                <rect className="particle rect"/>
                <path className="particle plus"/>
                <path className="particle triangle"/>
                <rect className="particle rect"/>
                <path className="particle plus"/>
            </g> */}
        </svg>
	    <input type="search" name="q" aria-label="Search for inspiration" value={item} onChange={(e) => {setSearch(e.target.value)}}/>
    </div>
    <div id="results">	
    </div>
    </>)
}

export default Search;