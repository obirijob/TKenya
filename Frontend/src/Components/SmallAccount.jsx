import { TimesIcon } from 'react-line-awesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import c from '../myConstants'
import './css/smallaccount.css'
import { faSuitcaseRolling, faUser, faUserCog } from '@fortawesome/free-solid-svg-icons'

function SmallAccount(params) {
    return (
        <div className="smallaccount">
            <TimesIcon className="close" onClick={()=>{params.hideAccount()}} />
            <div style={{ color: "#8a5019", textTransform: 'capitalize' }}>Hi {params.name}</div>
            <ul>
                <li><FontAwesomeIcon style={{ marginRight: 10 }} icon={faUser} />My Profile</li>
                <li><FontAwesomeIcon style={{ marginRight: 10 }} icon={faSuitcaseRolling} />My Trips</li>
                <div className="line"></div>
                <div className="separator"></div>
                <li><FontAwesomeIcon style={{ marginRight: 10 }} icon={faUserCog} />Settings</li>
            </ul>
            <button onClick={params.signOut}>Sign Out</button>
        </div>
    )
}

export default SmallAccount