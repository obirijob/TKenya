import React, { useState, useEffect } from 'react'
import { TimesIcon } from 'react-line-awesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/destmodal.css'
import { faExclamation, faSearch } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

import c from '../myConstants'

function DestinationsModal({ place, shown, handleClose, closeModal }) {
    const [s, setS] = useState("")
    const [sf, setSf] = useState("")
    if (place !== null) {
        let destF = place.destinations
        let facF = place.facilities
        return (
            <div style={
                shown ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }
            } className="destmodal" >
                <div className="destmodal-content" style={shown ? { transform: "scale(1)" } : { transform: "scale(.8)" }}>
                    <span className="destmodal-content-title">{place.name}</span>
                    <div className="destmodal-destinations">
                        <div className="destmodal-l-top">
                            Destinations
                            <div className="destmodal-badge">{
                                destF.length
                            }</div>
                            <div className="destmodal-dest-search">
                                <FontAwesomeIcon icon={faSearch} />
                                <input type="text" placeholder="Find Destinations" onChange={(e) => {
                                    setS(e.target.value.toLowerCase())
                                }} />
                            </div>
                        </div>
                        <div className="destmodal-list">
                            {
                                destF.filter(d => d.name.toLowerCase().includes(s))
                                    .map(d => (
                                        <div className="destmodal-item">
                                            <img src={`${c.backendUrl}/files/imagebyid/${d.images.split(',')[0]}`} alt="" />
                                            <span>{d.name}</span>
                                            <NavLink to={`/destination/${d.id}`}></NavLink>
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                    <div className="destmodal-facilities">
                        <div className="destmodal-l-top">
                            Facilities
                            <div className="destmodal-badge">{
                                place.facilities.length
                            }</div>
                            <div className="destmodal-fac-search">
                                <FontAwesomeIcon icon={faSearch} />
                                <input type="text" placeholder="Find Facilities" onChange={(e) => {
                                    setSf(e.target.value.toLowerCase())
                                }} />
                            </div>
                        </div>
                        <div className="destmodal-list">
                            {
                                facF.filter(d => d.name.toLowerCase().includes(sf))
                                .map(d => (
                                    <div className="destmodal-item">
                                        <img src={`${c.backendUrl}/files/facility/imagebyid/${d.images.split(',')[0]}`} alt="" />
                                        <span>{d.name}</span>
                                        <NavLink to={`/facility/${d.id}`}></NavLink>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <TimesIcon onClick={handleClose} className="destmodal-close" onClick={() => closeModal()} />
                </div>
            </div>
        )
    } else {
        return (
            <div style={
                shown ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }
            } className="destmodal" >
                <div className="destmodal-content">
                    <div className="bubbling" style={{ color: "red", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: "fixed", top: 0, bottom: 0, left: 0, right: 0 }}>
                        <FontAwesomeIcon size="4x" icon={faExclamation} style={{ margin: ".5rem" }} />
                        <span style={{ textAlign: 'center' }}>No Valid Location <br />Selected</span>
                    </div>
                    <TimesIcon onClick={handleClose} className="destmodal-close" onClick={() => closeModal()} />
                </div>
            </div>
        )
    }
}

export default DestinationsModal