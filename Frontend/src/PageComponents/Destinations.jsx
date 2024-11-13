import React, { useState, useEffect } from 'react'
import { faPlus, faPlusSquare, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './css/destinations.css'
import MainNav from '../Components/MainNavigator'
import Search from '../Components/Search'
import DestinationsModal from '../Components/DestinationsModal'
import c from '../myConstants'
import MobileMenu from '../Components/MobileMenu'

function Destinations() {
    const [randomImage, setrandomImage] = useState(null)
    const [places, setPlaces] = useState([])
    const [placesF, setPlacesF] = useState([])
    const [oSearch, setOSearch] = useState(false)
    const [mMenu, setMMenu] = useState(false)
    const [dMod, setDMod] = useState(false)
    const [selPlace, setSelPlace] = useState(null)
    useEffect(() => {
        fetch(`${c.backendUrl}/images/random`, { method: 'GET' }).then(async re => {
            if (re.ok) {
                let rnd = await re.json()
                setrandomImage(rnd)
            }
        })
        fetch(`${c.backendUrl}/places`, { method: 'GET' }).then(async re => {
            if (re.ok) {
                let rnd = await re.json()
                setPlaces(rnd)
                setPlacesF(rnd)
            }
        })
    }, [])
    function getRImg(p) {
        if (p.destinations.length > 0) {
            let ranDes = c.getRandomInt(0, p.destinations.length - 1);
            let imgss = p.destinations[ranDes].images.split(',')
            if (imgss.length > 0) {
                let ranIm = c.getRandomInt(0, imgss.length - 1)
                return `${c.backendUrl}/files/imagebyid/${p.destinations[ranDes].images.split(',')[ranIm]}`
            }
        } else
            return `${c.backendUrl}/files/imagebyid/14`
    }
    return (
        <div style={randomImage == null ? {} : {
            //backgroundImage: `url('${c.backendUrl}/files${randomImage[0].url}')`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed"
        }}>
            <DestinationsModal place={selPlace} shown={dMod} closeModal={() => setDMod(false)} />
            <Search shown={oSearch} handleClose={() => setOSearch(false)} setPlace={(p) => {
                setOSearch(false)
                /*selectDestination(0)
                fetch(`${c.backendUrl}/places/${p}`, { method: 'GET' }).then(async re => {
                    if (re.ok) {
                        let rnd = await re.json()
                        gsap.to('.places', .5, { opacity: 0, y: +30 }).then(() => {
                            console.log(rnd)
                            setRandomPlace(rnd)
                            setDestinations(rnd.destinations)
                            gsap.to('.places', .5, { opacity: 1, y: -30 })
                        })
                    }
                })*/
            }} />
            <div className="dss-container" style={randomImage == null ? {} : {
                background: "white",
                //" linear-gradient(45deg,rgba(0, 0, 0, 0.518),rgba(255, 255, 255, 0.566))",
                backgroundSize: "cover"
            }}>
                <MainNav showMenu={()=> setMMenu(true)} />
                <MobileMenu shown={mMenu} handleClose={()=> setMMenu(false)} />
                <div className="div" style={randomImage == null ? {} : {
                    background: `url('${c.backendUrl}/files/images/manga2.jpg')`,
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed"
                }}>
                    <div className="dss-search" >
                        <div className="dss-search-content">
                            <span className="dss-search-mtext">
                                Discover <br />New Destinations
                            </span>
                            <span className="dss-search-text">
                                Destinations from our Travel Gallery. Below is a list of Locations.
                            </span>
                            <div className="dss-search-div">
                                <FontAwesomeIcon style={{ color: "black" }} icon={faSearch} />
                                <input type="text" id="dss-search-main" onChange={(e) => {
                                    let pl = places.filter(p => p.name.toLowerCase().includes(
                                        document.querySelector('#dss-search-main').value.toLowerCase()));
                                    setPlacesF(pl)
                                    console.log(e.target.value)
                                }} placeholder="Search for Destinations" />
                            </div>
                            <span className="dss-search-small" style={{ color: "royalblue" }}>
                                This filters location by name. To have a more comprehensive filter, Kindly use the <b style={{ fontSize: 'small', textDecoration: 'underline', cursor: 'pointer', color: "green" }} onClick={() => setOSearch(true)}>Overral Search&nbsp;</b>. Thank You.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div id="dsstn">
                <div>
                    <div style={{ fontFamily: 'MSB', fontSize: "larger", display: 'flex', alignItems: 'center' }}>
                        {
                            placesF.length === places.length ? `${places.length.toLocaleString()} Locations`
                                : <div style={{ fontFamily: 'MSB', fontSize: "larger" }}>{placesF.length} Locations <span className="dss-badge">Filtered</span></div>
                        }
                        <div className="dss-suggest" >
                            <FontAwesomeIcon icon={faPlusSquare} />
                            <span>Suggest a Place</span>
                        </div>
                    </div>
                </div>
                <div className="dss-places-container">
                    <div className="dss-places">
                        {placesF.map(p => (
                            <div className="dss-place" onClick={() => {
                                setSelPlace(p)
                                let pp = p
                                if (pp.destinations < 1) {
                                    pp.bgI = getRImg(p)
                                    setSelPlace(pp)
                                    setDMod(true)
                                }
                                else {
                                    let dest = p.destinations[c.getRandomInt(0, p.destinations.length - 1)]
                                    let ri = c.getRandomInt(0, dest.images.split(',').length - 1)
                                    console.log(dest.images.split(','), ri)
                                    pp.bgI = `${c.backendUrl}/files/imagebyid/${dest.images.split(',')[ri]}`
                                    setSelPlace(pp)
                                    setDMod(true)
                                }
                            }} onMouseEnter={() => {
                                if (p.destinations.length > 0) {
                                    let ranDes = c.getRandomInt(0, p.destinations.length - 1);
                                    let imgss = p.destinations[ranDes].images.split(',')
                                    if (imgss.length > 0) {
                                        let ranIm = c.getRandomInt(0, imgss.length - 1)
                                        document.querySelector(`#rI${p.id}`).setAttribute('src', `${c.backendUrl}/files/imagebyid/${p.destinations[ranDes].images.split(',')[ranIm]}`)
                                    }
                                }
                            }} >
                                <img id={`rI${p.id}`} src={getRImg(p)} alt="" />
                                <div className="dss-place-content">
                                    <span id="dss-name">{p.name}</span>
                                    <span id="dss-count" style={{ paddingTop: ".2rem" }}>{p.destinations.length.toLocaleString()} Destinations, {p.facilities.length.toLocaleString()} Facilities</span>
                                </div>
                            </div>
                        ))}
                        <div className="dss-place" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <FontAwesomeIcon icon={faPlus} />
                                <span style={{ fontFamily: 'MSB' }}>Suggest a Place</span>
                            </div>
                            <span style={{ fontSize: 'small', position: 'absolute', bottom: "1rem" }}>Do you have / Know a good site?</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Destinations