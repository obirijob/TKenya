import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TimesIcon } from 'react-line-awesome'
import { NavLink } from 'react-router-dom'

import './css/search.css'
import c from '../myConstants'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

function Search(p) {
    const [search, setSearch] = useState("")
    const [st, setSt] = useState("wait")
    const [results, setResults] = useState({ destinations: [], locations: [] })
    return (
        <div style={
            p.shown ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }
        } className="search-component" >
            <TimesIcon onClick={p.handleClose} className="search-close" />
            <div className="search-content">
                <input type="text" placeholder="Type Something..." onKeyUp={(e) => {
                    if (e.key.toLowerCase() === "enter" && e.target.value.length > 0) {
                        setSt("start")
                        fetch(`${c.backendUrl}/search?q=${search}`).then(async re => {
                            if (re.ok) {
                                let r = await re.json()
                                setResults(r)
                                setSt("end")
                            }
                        })
                    }
                    setSearch(e.target.value)
                }} />
                <div className="search-results">
                    {
                        st == "wait" ? "..." :
                            st === "start" ? <FontAwesomeIcon className="rotating" icon={faCircleNotch} /> :
                                st === "end" ? <>
                                    <div className="destinations">
                                        {
                                            results.destinations.length < 1 ? "No Destinations" : <div>
                                                <span>{results.destinations.length > 1 ? `${results.destinations.length.toLocaleString()} Destinations` : `${results.destinations.length.toLocaleString()} Destination`} </span>
                                                <div className="dest-res" style={{ padding: "1rem" }}> {
                                                    results.destinations.map((d, i) => i < results.destinations.length - 1 ? <a href={`/destination/${d.id}`}>{d.name}, &nbsp;</a> : <a href={`/destination/${d.id}`}>{d.name}</a>)
                                                }</div></div>
                                        }
                                    </div>
                                    <div className="locations">
                                        {
                                            results.places.length < 1 ? "No Locations" : <div>
                                                <span>{results.places.length > 1 ? `${results.places.length.toLocaleString()} Locations` : `${results.places.length.toLocaleString()} Location`} </span>
                                                <div className="dest-res" style={{ padding: "1rem" }}> {
                                                    results.places.map((d, i) => i < results.places.length - 1 ? <span className="loc" onClick={()=>p.setPlace(d.id)}>{d.name}, &nbsp;</span> : <span className="loc" onClick={()=>p.setPlace(d.id)}>{d.name}</span>)
                                                }</div></div>
                                        }
                                    </div>
                                </> : "Error!"
                    }

                </div>
            </div>
        </div>
    )
}

export default Search