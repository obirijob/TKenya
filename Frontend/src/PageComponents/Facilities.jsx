import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './css/facilities.css'

import React, { useState } from 'react'
import Search from '../Components/Search'
import MainNavigator from '../Components/MainNavigator'
import { faMapMarker, faMapPin, faSearchLocation } from '@fortawesome/free-solid-svg-icons'

export default function Facilities(p) {
    const [oSearch, setOSearch] = useState(false)
    return (
        <facilities>
            <Search shown={oSearch} handleClose={() => setOSearch(false)} setPlace={(p) => {
                setOSearch(false)
            }} />
            <MainNavigator />
            <bgbox1 />
            <bgbox2 />
            <bgbox3 />
            <bgbox4 />
            <content>
                <welcome>
                    <welcometext>
                        <big>Hotels & <br />Facilities</big>
                        <small>Select Location</small>
                        <welcomesearch>
                            <FontAwesomeIcon icon={faMapMarker} />
                            <input placeholder="Type a Location" />
                            <FontAwesomeIcon icon={faSearchLocation} />
                        </welcomesearch>
                        <small>Filter by location</small>
                    </welcometext>
                    <welcomeimages>
                        
                    </welcomeimages>
                </welcome>
            </content>
        </facilities>
    )
}