import React, {useState} from 'react'
import { faSearch, faSuitcaseRolling, faThumbsUp, faInfoCircle, faHome, faCompass, faUser, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

import Search from '../Components/Search'
import './css/mainnav.css'

function MainNav(p) {
    const [showSearch, setShowSearch] = useState(false)
    
    return (<>
        <Search shown={showSearch} handleClose={() => setShowSearch(false)} setPlace={(p) => {
            setShowSearch(false)
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
        <div className="main-nav">
            <div className="main-nav-logo">
                Logo
            </div>
            <div className="main-nav-search" onClick={()=>{setShowSearch(true)}}>
                <FontAwesomeIcon icon={faSearch} className="searchicon" />
                <div className="main-nav-search-text">Overall Search...</div>
            </div>
            <div className="main-nav-links">
                <ul>
                <li className="link"><NavLink activeClassName="navi" to="/home" >
                        <FontAwesomeIcon className="nav-link-icon" icon={faHome} />
                        <span>Home</span>
                    </NavLink></li>
                    
                    <li className="link"><NavLink activeClassName="navi" to="/destinations" >
                        <FontAwesomeIcon className="nav-link-icon" icon={faCompass} />
                        <span>Destinations</span>
                    </NavLink></li>
                    <li className="link"><NavLink to="/facilities" >
                        <FontAwesomeIcon className="nav-link-icon" icon={faSuitcaseRolling} />
                        <span>Facilities</span>
                    </NavLink></li>
                    <li className="link"><NavLink to="/social" >
                        <FontAwesomeIcon className="nav-link-icon" icon={faThumbsUp} />
                        <span>Social</span>
                    </NavLink></li>
                    <li className="link"><NavLink to="/about" >
                        <FontAwesomeIcon className="nav-link-icon" icon={faInfoCircle} />
                        <span>About</span>
                    </NavLink></li>
                </ul>
            </div>
            <div className="main-nav-account">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <FontAwesomeIcon onClick={p.showMenu} className="main-nav-mobile" icon={faBars} />
        </div>
    </>)
}

export default MainNav