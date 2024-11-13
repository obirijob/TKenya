import { TimesIcon } from 'react-line-awesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './css/mobilemenu.css'
import { faCompass, faHome, faInfo, faSuitcaseRolling, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

export default function MobileMenu(p) {
    return (<div style={
        p.shown ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }
    } className="mmenu-component" >
        <TimesIcon onClick={p.handleClose} className="search-close" />
        <div className="mmenu-content">
            <NavLink to='/home' className="mmenu-link">
                <FontAwesomeIcon icon={faHome} />
                <span >Home</span>
            </NavLink>
            <NavLink to='/destinations' className="mmenu-link">
                <FontAwesomeIcon icon={faCompass} />
                <span >Destinations</span>
            </NavLink>
            <NavLink to='/facilities' className="mmenu-link">
                <FontAwesomeIcon icon={faSuitcaseRolling} />
                <span >Facilities</span>
            </NavLink>
            <NavLink to='/social' className="mmenu-link">
                <FontAwesomeIcon icon={faThumbsUp} />
                <span >Social</span>
            </NavLink>
            <NavLink to='/about' className="mmenu-link">
                <FontAwesomeIcon icon={faInfo} />
                <span >About</span>
            </NavLink>
        </div>
    </div>)
}