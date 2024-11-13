import NavBar from '../Social/Components/NavBar'
import './css/social.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCar, faPlane, faSuitcase, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons'

function Social(params) {
    return <social>
        <NavBar />
        <content>
            <lsidebar>
                <ul>
                    <li> <FontAwesomeIcon icon={faUserFriends} /> Friends <badge>214</badge></li>
                    <li> <FontAwesomeIcon icon={faUsers} /> Groups <badge>3</badge></li>
                </ul>
                <ul>
                    <li> <FontAwesomeIcon icon={faPlane} /> Favorite Destinations <badge>214</badge></li>
                    <li> <FontAwesomeIcon icon={faSuitcase} /> Favourite Facilities <badge>3</badge></li>
                    <li> <FontAwesomeIcon icon={faCar} /> My Trips <badge>3</badge></li>
                </ul>
                <ul>
                    <li><FontAwesomeIcon icon={faCalendar} /> Calendar <badge>214</badge></li>
                </ul>
            </lsidebar>
            <maincontent>
                <newpost>
                    <newtop>
                        <img />
                    </newtop>
                </newpost>
            </maincontent>
            <rsidebar>Right Side Bar</rsidebar>
        </content>
    </social>
}

export default Social