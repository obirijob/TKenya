import React, { useState, useEffect } from 'react'
import { AngleLeftIcon, AngleRightIcon, BookmarkIcon, GlobeIcon, RetweetIcon, SearchIcon } from 'react-line-awesome'
import gsap from 'gsap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import c from '../myConstants'
import RatingBar from '../Components/RatingBar'
import { NavLink } from 'react-router-dom'
import { faBars, faCircleNotch, faCompass, faInfoCircle, faSearch, faSignInAlt, faSuitcaseRolling, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import SmallSignIn from '../Components/SmallSignIn'
import SmallAccount from '../Components/SmallAccount'
import Search from '../Components/Search'
import MobileMenu from '../Components/MobileMenu'

function HomePage() {
    const [randomImg, setRandomImg] = useState([])
    const [selectedImg, setSelectedImg] = useState(0)
    const [randomPlace, setRandomPlace] = useState(null)
    const [selectedDestination, setSelectedDestination] = useState(0)
    const [loggedUser, setLoggedUser] = useState(null)
    const [showSearch, setShowSearch] = useState(false)
    const [destinations, setDestinations] = useState([])
    const [mmenu, setMmenu] = useState(false)

    useEffect(() => {
        fetch(`${c.backendUrl}/images/random`, { method: 'GET' }).then(async re => {
            if (re.ok) {
                let rnd = await re.json()
                setRandomImg(rnd)
                selectImage(0)
            }
        })
        fetch(`${c.backendUrl}/places/random`, { method: 'GET' }).then(async re => {
            if (re.ok) {
                let rnd = await re.json()
                setRandomPlace(rnd)
                setDestinations(rnd.destinations)
            }
        })
        if (localStorage.getItem('authtoken') !== null) {
            let u = localStorage.getItem('authtoken')
            getLoggedUser(u)
        } else {
            setLoggedUser({ error: true, user: "No Token" })
        }
    }, [])

    // let grad = [
    //     "linear-gradient(45deg, rgba(0, 0, 0, .3), rgba(0, 0, 0, .6))",
    //     "linear-gradient(135deg, rgba(0, 0, 0, .6), rgba(0, 0, 0, .3))",
    //     "linear-gradient(68deg, rgba(0, 0, 0, .3), rgba(0, 0, 0, .6))",
    //     "linear-gradient(42deg, rgba(0, 0, 0, .6), rgba(0, 0, 0, .3))"
    // ]

    function selectImage(n) {
        document.querySelector(`#homeitem${n}`).style.opacity = 1
        document.querySelector(`#checker${n}`).classList.add("selected")
        for (var i = 0; i < randomImg.length; i++) {
            if (i == n) { } else {
                document.querySelector(`#homeitem${i}`).style.opacity = 0
                document.querySelector(`#checker${i}`).classList.remove("selected")
            }
        }
        setSelectedImg(n)
    }

    function getLoggedUser(token) {
        fetch(`${c.backendUrl}/accounts/loggeduser/${token}`).then(async u => {
            if (u.ok) {
                let us = await u.json()
                setLoggedUser({ error: false, user: us })
            } else {
                let us = await u.text()
                setLoggedUser({ error: true, user: us })
            }
        })
    }

    function selectDestination(i) {
        try {
            document.querySelector(`#dest${selectedDestination}`).classList.remove("selected")
            document.querySelector(`#dest${i}`).classList.add("selected")
            document.querySelector(`#dest${i}`).scrollIntoView({ behavior: "smooth" })
            setSelectedDestination(i)
        } catch (ex) {
            console.log(ex)
        }
    }

    function hideAccount() {
        gsap.fromTo('.smallaccount', 1, { opacity: 1, pointerEvents: "all", y: 0 }, { opacity: 0, pointerEvents: "none", y: 30 })
    }
    function showAccount() {
        gsap.fromTo('.smallaccount', 1, { opacity: 0, pointerEvents: "none", y: 30 }, { opacity: 1, pointerEvents: "all", y: 0 })
    }
    function signout() {
        fetch(`${c.backendUrl}/accounts/signout`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: localStorage.getItem('authtoken') }) }).then(r => {
            setLoggedUser({ error: true, user: "Signed Out" })
            localStorage.removeItem('authtoken')
        })
    }

    return (<div class="homepage">
        <Search shown={showSearch} handleClose={() => setShowSearch(false)} setPlace={(p) => {
            setShowSearch(false)
            selectDestination(0)
            fetch(`${c.backendUrl}/places/${p}`, { method: 'GET' }).then(async re => {
                if (re.ok) {
                    let rnd = await re.json()
                    if (window.innerWidth > 750){
                        gsap.to('.places', .5, { opacity: 0, y: +30 }).then(() => {
                            setRandomPlace(rnd)
                            setDestinations(rnd.destinations)
                            gsap.to('.places', .5, { opacity: 1, y: -30 })
                        })
                    } else {
                        gsap.to('.places', .5, { opacity: 0 }).then(() => {
                            setRandomPlace(rnd)
                            setDestinations(rnd.destinations)
                            gsap.to('.places', .5, { opacity: 1 })
                        })
                    }
                }
            })
        }} />
        <MobileMenu shown={mmenu} handleClose={()=>{setMmenu(false)}} />
        <div className="navbar">
            <div className="logo">Logo</div>
            <div className="menu">
                <div className="links">
                    <ul>
                        <li className="link"><NavLink to="/destinations" >
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
                <div className="search" onClick={() => setShowSearch(true)}><SearchIcon /></div>
                <div className="account">
                    {
                        loggedUser === null ?
                            <div>
                                <FontAwesomeIcon style={{ fontSize: "x-large" }} className="rotating" icon={faCircleNotch} />
                            </div>
                            :
                            loggedUser.error === true ?
                                <div className="signin-nav" >
                                    <span onClick={() => {
                                        gsap.fromTo('.smallsignin', 1, { opacity: 0, pointerEvents: "none", y: 30 }, { opacity: 1, pointerEvents: "all", y: 0 })
                                    }}>Sign In</span>
                                    <FontAwesomeIcon onClick={() => {
                                        gsap.fromTo('.smallsignin', 1, { opacity: 0, pointerEvents: "none", y: 30 }, { opacity: 1, pointerEvents: "all", y: 0 })
                                    }} style={{ fontSize: "x-large", marginLeft: ".5rem" }} icon={faSignInAlt} />
                                    <SmallSignIn refreshLogin={(u) => {
                                        getLoggedUser(u.token)
                                    }} />
                                </div>
                                :
                                <div className="loggeduser">
                                    <span onClick={showAccount}>Hello, {loggedUser.user.name.toLowerCase()}</span>
                                    <img onClick={showAccount} src={`${c.backendUrl}${loggedUser.user.image}`} alt="" />
                                    <SmallAccount signOut={signout} hideAccount={hideAccount} name={loggedUser.user.name.toLowerCase()} />
                                </div>
                    }
                </div>
            </div>
            <FontAwesomeIcon className="mob-icon" onClick={() => setMmenu(true)} icon={faBars} />
        </div>
        {randomImg.map((r, i) =>
            <div className="homeitem" id={`homeitem${i}`}>
                <img className="coverimg" src={`${c.backendUrl}/files${r.url}`} alt="" />
                <div className="covertint" style={{ background: "radial-gradient(rgba(0,0,0,0.0), rgba(0,0,0,1)), linear-gradient(45deg, rgba(0, 128, 0, 0.4),rgba(165, 42, 42, 0.4))" }}></div>
                <div className="hometext">
                    <span className="bigtext"><GlobeIcon /> {r.description}, </span>
                    <span className="smalltext">
                        &nbsp;{r.country}
                    </span>
                </div>
            </div>
        )}
        <div className="selector">
            {randomImg.map((r, i) =>
                <div class="checker" id={`checker${i}`} onClick={() => selectImage(i)}></div>
            )}
        </div>
        <div className="places">
            <div className="text">
                <div className="largetext">{randomPlace !== null ? randomPlace.name : "..."}</div>
                <div className="description">{randomPlace !== null ? randomPlace.description : " "}</div>
                <div className="pls-search">
                    <input type="text" id="plssearch" placeholder="Filter Destinations" onChange={(e) => {
                        let ds = randomPlace.destinations.filter(d => d.name.toLowerCase().includes(e.target.value.toLowerCase()))
                        setDestinations(ds)
                        if (destinations.length > 0) {
                            selectDestination(0)
                        }
                    }} />
                    <FontAwesomeIcon className="ic" icon={faSearch} />
                </div>
                <div id="refexbtndiv" style={{ display: "flex" }}>
                    <div className="refreshbutton" title="Random Location" onClick={() => {
                        if (destinations.length > 0) selectDestination(0)
                        fetch(`${c.backendUrl}/places/random?prev=${randomPlace.rnd}`, { method: 'GET' }).then(async re => {
                            if (re.ok) {
                                document.querySelector('#plssearch').value = ""
                                let rnd = await re.json()
                                if (window.innerWidth > 750){
                                    gsap.to('.places', .5, { opacity: 0, y: +30 }).then(() => {
                                        setRandomPlace(rnd)
                                        setDestinations(rnd.destinations)
                                        gsap.to('.places', .5, { opacity: 1, y: -30 })
                                    })
                                } else {
                                    gsap.to('.places', .5, { opacity: 0 }).then(() => {
                                        setRandomPlace(rnd)
                                        setDestinations(rnd.destinations)
                                        gsap.to('.places', .5, { opacity: 1 })
                                    })
                                }
                            }
                        })
                    }}><RetweetIcon /></div>
                    <div className="homebutton" style={{ marginLeft: "1rem" }}>Explore <AngleRightIcon /></div>
                </div>
            </div>
            <div className="destinations">
                {randomPlace !== null ? (destinations.length > 0 ?
                    destinations
                        // .filter(d => d.name.toLowerCase().includes(
                        //     document.querySelector('#plssearch').value.toLowerCase()
                        // ))
                        .map((d, i) => <div onClick={(e) => {
                            //select box
                            selectDestination(i)
                        }} id={`dest${i}`} class={i == 0 ? "selected destination" : "destination"}>
                            <div className="name">{d.name}</div>
                            <div className="destination-rating"><RatingBar rating="3" /></div>
                            <div className="bookmark"><BookmarkIcon /></div>
                            <img src={`${c.backendUrl}/files/imagebyid/${d.images.split(',')[0]}`} alt="" />
                            <div className="description">
                                {d.description.length > 60 ? d.description.substring(0, 60) + " ..." : d.description}
                                <NavLink className="visitbtn" to={`/destination/${d.id}`} >Visit</NavLink>
                            </div>
                        </div>) : <div> No Destinations In Found ! </div>) : ""}
                <div className="scrollbuttons">
                    <div onClick={() => {
                        if (destinations.length > 0) {
                            if (selectedDestination == 0)
                                selectDestination(destinations.length - 1)
                            else
                                selectDestination(selectedDestination - 1)
                        }
                    }}><AngleLeftIcon /></div>
                    <div onClick={() => {
                        if (destinations.length > 0) {
                            if (selectedDestination == destinations.length - 1)
                                selectDestination(0)
                            else
                                selectDestination(selectedDestination + 1)
                        }
                    }}><AngleRightIcon /></div>
                </div>
                <div className="scrollindicator">
                    {randomPlace !== null ? (<>
                        <span className="position">{(selectedDestination + 1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</span>
                        <div className="line">out</div>
                        <span className="outof">{(randomPlace.destinations.length).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}</span>
                    </>) : <></>}
                </div>
            </div>
        </div>
    </div>)
}
export default HomePage