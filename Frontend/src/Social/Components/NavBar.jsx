import { faBell, faComments, faCompass, faExclamation, faHome, faPlus, faSearch, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

function NavBar(p) {
    return <mainnav>
        <logo>Logo</logo>
        <search>
            <FontAwesomeIcon icon={faSearch} />
            <input type="text" placeholder="Search..." />
        </search>
        <links>
            <ul>
                <li>
                    <NavLink to='/home'>
                        <FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/Destinations'>
                        <FontAwesomeIcon icon={faCompass} />
                        <span>Destinations</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/facilities'>
                        <FontAwesomeIcon icon={faSuitcaseRolling} />
                        <span>Facilities</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/About'>
                        <FontAwesomeIcon icon={faExclamation} />
                        <span>About</span>
                    </NavLink>
                </li>
            </ul>
        </links>
        <quickview>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faPlus} />
                </li>
                <li>
                    <FontAwesomeIcon icon={faComments} />
                    <badge>238</badge>
                </li>
                <li>
                    <FontAwesomeIcon icon={faBell} />
                    <badge>148</badge>
                </li>
            </ul>
        </quickview>
        <account>
            Account
        </account>
    </mainnav>
}

export default NavBar