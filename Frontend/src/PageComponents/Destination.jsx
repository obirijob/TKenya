import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

import './css/destination.css'
import c from '../myConstants'
import SmallSignIn from '../Components/SmallSignIn'
import SmallAccount from '../Components/SmallAccount'
import MobileMenu from '../Components/MobileMenu'
import Search from '../Components/Search'
import { faBars, faCircleNotch, faComment, faComments, faCompass, faExclamationTriangle, faGlobeAfrica, faHome, faImage, faSearch, faShareAlt, faSpinner, faSuitcaseRolling, faThumbsDown, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import gsap from 'gsap'

function Destination() {
    const [destination, setDestination] = useState({ state: "waiting", bg: "white" })
    const [ode, setOde] = useState([])
    const [fac, setFac] = useState([])
    const [im, setIm] = useState(0)
    const [dlikes, setDlikes] = useState([])
    const [myKind, setMyKind] = useState([])
    const [comments, setComments] = useState([])
    const [cmr, setCmr] = useState([])
    const [loggedUser, setLoggedUser] = useState(null)
    const [mmenu, setMmenu] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    let id = window.location.pathname.split('/')[2]

    useEffect(() => {
        loadDestination(id)
        getMyKind(id)
        getComments(id)
    }, [])
    function loadDestination(x) {
        fetch(`${c.backendUrl}/destinations/${x}`).then(async r => {
            if (r.ok) {
                let d = await r.json()
                setDestination({ state: "success", dd: d[0] })
                fetch(`${c.backendUrl}/destinations/inplace/${d[0].place.id}`).then(async r => {
                    if (r.ok) {
                        let od = await r.json()
                        setOde(od)
                    }
                })
                fetch(`${c.backendUrl}/facilities/inplace/${d[0].place.id}`).then(async r => {
                    if (r.ok) {
                        let od = await r.json()
                        setFac(od)
                    }
                })
            } else {
                let e = await r.text()
                setDestination({ state: "error", details: e, bg: "white" })
            }
        })
        destLikes(x)
        getLoggedUser(localStorage.getItem('authtoken'))
    }
    function selectOption(e) {
        document.querySelector('.selected').classList.remove('selected')
        e.target.classList.add('selected')
    }

    function destLikes(d) {
        fetch(`${c.backendUrl}/likes/e/D-${d}`).then(async l => {
            if (!l.ok) {
                let ll = await l.text()
                console.log(ll)
            }
            let ll = await l.json()
            setDlikes(ll)
        })
    }

    function getMyKind(d) {
        fetch(`${c.backendUrl}/likes/my-e/D-${d}`, { headers: { 'authtoken': localStorage.getItem('authtoken') } }).then(async l => {
            if (!l.ok) {
                let ll = await l.text()
                console.log(ll)
            } else {
                let ll = await l.json()
                console.log('my reaction', ll)
                setMyKind(ll)
            }
        })
    }

    function actUpon(k) {
        fetch(`${c.backendUrl}/likes/D-${id}/${k}`, { method: 'POST', headers: { 'authtoken': localStorage.getItem('authtoken') } }).then(async l => {
            if (l.ok) {
                console.log('acted')
                getMyKind(id)
                destLikes(id)
            }
            else {
                let ll = await l.json()
                console.log(ll)
                getMyKind(id)
                destLikes(id)
            }
        })
    }

    function getComments(d) {
        fetch(`${c.backendUrl}/comments/e/D-${d}`, { headers: { 'authtoken': localStorage.getItem('authtoken') } }).then(async l => {
            if (!l.ok) {
                let ll = await l.text()
                console.log(ll)
            } else {
                let ll = await l.json()
                console.log('destination comments', ll)
                setComments(ll)
            }
        })
    }

    function makeComment(ent, mess) {
        if (mess == null || mess.length < 1) return alert('Message Cannot be Null')
        fetch(`${c.backendUrl}/comments/D-${ent}`, { method: 'POST', headers: { 'authtoken': localStorage.getItem('authtoken'), "Content-Type": "application/json" }, body: JSON.stringify({ message: mess }) })
            .then(async cm => {
                if (!cm.ok) {
                    let cmm = await cm.json()
                    console.log(cmm)
                } else {
                    getComments(ent)
                }
            })
    }

    function getLoggedUser(token) {
        c.getLoggedUser(token).then(async u => {
            if (u.ok) {
                let us = await u.json()
                setLoggedUser({ error: false, user: us })
            } else {
                let us = await u.text()
                setLoggedUser({ error: true, user: us })
            }
        })
    }

    return (
        <div className="destination-page">
            <MobileMenu shown={mmenu} handleClose={() => setMmenu(false)} />
            <Search shown={showSearch} handleClose={() => setShowSearch(false)}></Search>
            <destnav style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faBars} onClick={() => setMmenu(true)} className="mobiletoggle" />
                <FontAwesomeIcon style={{cursor:'pointer'}} icon={faSearch} className='destsearch' onClick={() => setShowSearch(true)} />
                <links><ul style={{ display: 'flex', flexDirection: 'row', listStyle: 'none' }}>
                    <li><NavLink to='/home'>Home</NavLink></li>
                    <li><NavLink to='/Destinations'>Destinations</NavLink></li>
                    <li><NavLink to='/Facilities'>Facilities</NavLink></li>
                    <li><NavLink to='/Social'>Social</NavLink></li>
                    <li><NavLink to='/About'>About</NavLink></li>
                </ul></links>
                <account style={{}}>
                    {loggedUser == null ? <FontAwesomeIcon icon={faCircleNotch} className='rotating' /> : loggedUser.error ? <>
                        <FontAwesomeIcon className="notlogged" icon={faUser} onClick={() => {
                            gsap.fromTo('.smallsignin', 1, { opacity: 0, pointerEvents: "none", y: 20 }, { opacity: 1, pointerEvents: "all", y: -20 })
                        }} />
                        <SmallSignIn refreshLogin={(u) => {
                            getLoggedUser(u.token)
                        }} />
                    </> : <loggeduser>
                        <div onClick={() => {
                            gsap.fromTo('.smallaccount', 1, { opacity: 0, pointerEvents: "none", y: 20 }, { opacity: 1, pointerEvents: "all", y: -20 })
                        }} style={{ cursor: 'pointer', width: 40, height: 40, borderRadius: '50%', background: `url('${c.backendUrl}${loggedUser.user.image}')`, backgroundSize: 'cover' }} alt="" ></div>
                        <SmallAccount signOut={() => {
                            fetch(`${c.backendUrl}/accounts/signout`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: localStorage.getItem('authtoken') }) }).then(r => {
                                setLoggedUser({ error: true, user: "Signed Out" })
                                localStorage.removeItem('authtoken')
                            })
                        }} name={loggedUser.user.name.toLowerCase()} hideAccount={() => {
                            gsap.fromTo('.smallaccount', 1, { opacity: 1, pointerEvents: "all", y: -20 }, { opacity: 0, pointerEvents: "none", y: 20 })
                        }} />
                    </loggeduser>}
                </account>
            </destnav>
            {
                destination.state === "waiting" ? <FontAwesomeIcon size="5x" className="rotating" icon={faSpinner} /> :
                    destination.state === "error" ? <FontAwesomeIcon size="5x" icon={faExclamationTriangle} /> : <>
                        <img src={`${c.backendUrl}/files/imagebyid/${destination.dd.images.split(',')[im]}`} alt="" className="bgimg" />
                        <div className="blur"></div>
                        <div className="container">
                            <NavLink to="/" className="homelink" style={{ display: 'none' }}>
                                <FontAwesomeIcon icon={faHome} />
                                <span>Home</span>
                            </NavLink>
                            <img src={`${c.backendUrl}/files/imagebyid/${destination.dd.images.split(',')[im]}`} alt="" />
                            <div className="content">
                                <div className="labelcontainer">
                                    <span className="location"><FontAwesomeIcon icon={faGlobeAfrica} />&nbsp;{destination.dd.place.name}, {destination.dd.place.country}</span>
                                    <span className="name">{destination.dd.name}</span>
                                    <span className="description">{destination.dd.description}</span>
                                    <div className="thumbnails">
                                        {
                                            destination.dd.images.split(',').map((i, v) => (
                                                <img className="thimg" onClick={() => {
                                                    setIm(v)
                                                }} src={`${c.backendUrl}/files/imagebyid/${i}`} alt="" />
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="contentcontainer">
                                    <div className="dcontent dconsel" id="near">
                                        <span className="title">Nearby Destinations</span>
                                        <div style={{
                                            borderRadius: 5,
                                            display: 'flex', alignItems: 'center', padding: 10, margin: 5, outline: 'none', border: 'none', background: 'rgba(0,0,0,.1)'
                                        }}>
                                            <FontAwesomeIcon icon={faSearch} style={{ color: 'rgba(0,0,0,.5)', marginRight: 10 }} />
                                            <input style={{ flex: "1", background: 'transparent', outline: 'none', border: 'none' }} placeholder="Filter Destinations" />
                                        </div>
                                        <div style={{ flex: "1", display: "flex", flexDirection: "column", marginTop: ".5rem", height: "100%", overflow: "scroll" }}>
                                            {
                                                ode.filter(x => x.id != id).map(o => (<>
                                                    <a href={`/destination/${o.id}`} className="otherd" onClick={() => loadDestination(o.id)}>
                                                        <img className="ctimg" style={{ width: "100px", height: "100px", position: "relative", border: "solid 1px black" }} src={`${c.backendUrl}/files/imagebyid/${o.images.split(',')[0]}`} alt="" />
                                                        <div style={{ flex: "1", display: "flex", flexDirection: "column", position: "relative", padding: "0 .5rem" }}>
                                                            <span style={{ marginBottom: ".5rem", fontFamily: 'MSB' }}>{o.name}</span>
                                                            <span style={{ fontSize: "small" }}>{
                                                                o.description.length > 80 ? o.description.substring(0, 80) + "..." : o.description
                                                            }</span>
                                                        </div>
                                                    </a>
                                                </>))
                                            }
                                        </div>
                                        <div className="bottom">Suggest</div>
                                    </div>
                                    <div className="dcontent" id="facilities">
                                        <span className="title">Nearby Facilities</span>
                                        <div style={{
                                            borderRadius: 5,
                                            display: 'flex', alignItems: 'center', padding: 10, margin: 5, outline: 'none', border: 'none', background: 'rgba(0,0,0,.1)'
                                        }}>
                                            <FontAwesomeIcon icon={faSearch} style={{ color: 'rgba(0,0,0,.5)', marginRight: 10 }} />
                                            <input style={{ flex: "1", background: 'transparent', outline: 'none', border: 'none' }} placeholder="Filter Facilities" />
                                        </div>
                                        <div style={{ flex: "1", display: "flex", flexDirection: "column", marginTop: ".5rem", height: "100%", overflow: "scroll" }}>
                                            {
                                                fac.map(o => (<>
                                                    <NavLink to={`/facility/${o.id}`} className="otherd" onClick={() => loadDestination(o.id)}>
                                                        <img style={{ width: "100px", height: "100px", position: "relative", border: "solid 1px black" }} src={`${c.backendUrl}/files/facility/imagebyid/${o.images.split(',')[0]}`} alt="" />
                                                        <div style={{ flex: "1", display: "flex", flexDirection: "column", position: "relative", padding: "0 .5rem" }}>
                                                            <span style={{ marginBottom: ".5rem", fontFamily: 'MSB' }}>{o.name}</span>
                                                            <span style={{ fontSize: "small" }}>{
                                                                o.description.length > 80 ? o.description.substring(0, 80) + "..." : o.description
                                                            }</span>
                                                        </div>
                                                    </NavLink>
                                                </>))
                                            }
                                        </div>
                                        <div className="bottom">Report / Suggest</div>
                                    </div>
                                    <div className="dcontent" id="comments">
                                        <span className="title">Comments {comments.length.toLocaleString()}</span>
                                        <div className="comments-list">
                                            {comments.map((co, i) => <>
                                                <div className="ccm" id={`C-${co.id}`}>
                                                    <img src={`${c.backendUrl}${co.image}`} alt="" className="ccm-image" />
                                                    <div className="ccm-content">
                                                        <div className="ccm-user">
                                                            <span className="ccm-user-name">{co.name}</span>
                                                            <span className="ccm-date">{moment(co.commentdate).fromNow(false)}</span>
                                                        </div>
                                                        <div className="ccm-message">
                                                            {co.message}
                                                        </div>
                                                        <div className="ccm-actions">
                                                            <div className="ccm-action" onClick={() => {
                                                                c.makeLike(`C-${co.id}`, 1).then(() => {
                                                                    c.getEntityLikes(`C-${co.id}`).then(async l => {
                                                                        if (!l.ok) { let e = await l.json(); console.log(e) }
                                                                        else {
                                                                            let lcom = await l.json()
                                                                            let tu = lcom.filter(ll => ll.kind == 1)
                                                                            let td = lcom.filter(ll => ll.kind == 0)
                                                                            document.querySelector(`#TU-C-${co.id}`).innerText = tu.length
                                                                            document.querySelector(`#TD-C-${co.id}`).innerText = td.length
                                                                        }
                                                                    })
                                                                })
                                                            }}>
                                                                <FontAwesomeIcon className="ccm-ic" icon={faThumbsUp} />
                                                                <dcomt id={`TU-C-${co.id}`}>{co.thumbsup}</dcomt>
                                                            </div>
                                                            <div className="ccm-action" onClick={() => {
                                                                c.makeLike(`C-${co.id}`, 0).then(() => {
                                                                    c.getEntityLikes(`C-${co.id}`).then(async l => {
                                                                        if (!l.ok) { let e = await l.json(); console.log(e) }
                                                                        else {
                                                                            let lcom = await l.json()
                                                                            let tu = lcom.filter(ll => ll.kind == 1)
                                                                            let td = lcom.filter(ll => ll.kind == 0)
                                                                            document.querySelector(`#TU-C-${co.id}`).innerText = tu.length
                                                                            document.querySelector(`#TD-C-${co.id}`).innerText = td.length
                                                                        }
                                                                    })
                                                                })
                                                            }}>
                                                                <FontAwesomeIcon className="ccm-ic" icon={faThumbsDown} />
                                                                <dcomt id={`TD-C-${co.id}`}>{co.thumbsdown}</dcomt>
                                                            </div>
                                                            <div className="ccm-action" onClick={() => {
                                                                setCmr([])
                                                                c.getEntityComments(`C-${co.id}`).then(async cm => {
                                                                    if (cm.ok) {
                                                                        let cmm = await cm.json()
                                                                        setCmr(cmm)
                                                                    }
                                                                })
                                                                //console.log(commentR(co.rawreplies), document.querySelector(`#dcomrep-list-${co.id}`))
                                                                //document.querySelector(`#dcomrep-list-${co.id}`).innerHTML = commentR(co.rawreplies)
                                                                if (document.querySelector(`#dcomreply-${co.id}`).style.display === 'none') {
                                                                    document.querySelector(`.cmt-bottom`).style.display = 'none'
                                                                    document.querySelectorAll('decomreplies').forEach(d => {
                                                                        d.style.display = 'none'
                                                                    })
                                                                    document.querySelectorAll('decomreply').forEach(d => {
                                                                        d.style.display = 'none'
                                                                    })
                                                                    document.querySelector(`#dcomreply-${co.id}`).style.display = 'block'
                                                                    document.querySelector(`#dcomrep-list-${co.id}`).style.display = 'block'
                                                                    document.querySelector(`#repbot-${co.id}`).scrollIntoView({ behavior: 'smooth' })
                                                                }
                                                                else {
                                                                    document.querySelector(`#dcomreply-${co.id}`).style.display = 'none'
                                                                    document.querySelector(`.cmt-bottom`).style.display = 'block'
                                                                    document.querySelector(`#dcomrep-list-${co.id}`).style.display = 'none'
                                                                }

                                                            }}>
                                                                <FontAwesomeIcon className="ccm-ic" icon={faComment} />
                                                                {co.replies == 0 ? "Reply" : co.replies == 1 ? "1 Reply" : `${co.replies.toLocaleString()} Replies`}
                                                            </div>
                                                            <div className="ccm-action">
                                                                <FontAwesomeIcon className="ccm-ic" icon={faShareAlt} />
                                                            </div>
                                                        </div>
                                                        <decomreplies id={`dcomrep-list-${co.id}`} style={{ display: 'none' }} >
                                                            {
                                                                cmr.map(r => <decomreplyitem className='decom-reply'>
                                                                    <img className='decomreplyimg' src={`${c.backendUrl}${r.image}`} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                                                                    <decomreplyitemcontent>
                                                                        <decomreplyitemu>
                                                                            <span>{r.name}</span>
                                                                            <span>{moment(r.commentdate).fromNow(false)}</span>
                                                                        </decomreplyitemu>
                                                                        <decomreplyitemc>
                                                                            {r.message}
                                                                        </decomreplyitemc>
                                                                    </decomreplyitemcontent>
                                                                </decomreplyitem>)
                                                            }
                                                        </decomreplies>
                                                        <decomreply id={`dcomreply-${co.id}`}>
                                                            <textarea id={`dcomreply-textarea-${co.id}`} placeholder='Reply...' />
                                                            <button onClick={() => {
                                                                c.makeComment(`C-${co.id}`, document.querySelector(`#dcomreply-textarea-${co.id}`).value).then(async cm => {
                                                                    if (!cm.ok) { let cmm = await cm.text(); alert('comment not made') }
                                                                    c.getEntityComments(`C-${co.id}`).then(async cc => {
                                                                        if (cc.ok) {
                                                                            let rp = await cc.json()
                                                                            setCmr(rp)
                                                                            document.querySelector(`#dcomreply-textarea-${co.id}`).value = ''
                                                                        }
                                                                    })
                                                                })
                                                            }}>Reply</button>
                                                        </decomreply>
                                                        <repbot id={`repbot-${co.id}`}></repbot>
                                                    </div>
                                                </div>
                                                <div id="ccmbottomdiv"></div>
                                            </>)}
                                        </div>
                                        <div className="cmt-bottom">
                                            <div className="comment">
                                                <textarea name="" id="cmt-message" rows="5" placeholder="Say Something ..." />
                                                <div className="comment-actions">
                                                    <button>
                                                        <FontAwesomeIcon icon={faImage} />
                                                    </button>
                                                    <button onClick={() => makeComment(
                                                        `${id}`,
                                                        document.querySelector('#cmt-message').value
                                                    )}>Post</button>
                                                </div>

                                            </div>
                                        </div>
                                        <div id="ccmmbottomdiv"></div>
                                    </div>
                                </div>
                                <div className="optionscontainer">
                                    <div className="option selected" onClick={(e) => {
                                        selectOption(e)
                                        document.querySelector("#near").classList.remove("dconsel")
                                        document.querySelector("#facilities").classList.remove("dconsel")
                                        document.querySelector("#comments").classList.remove("dconsel")
                                        document.querySelector("#near").classList.add("dconsel")
                                        document.querySelector("#near").scrollIntoView({ behavior: "smooth" })
                                    }}>
                                        <FontAwesomeIcon style={{ pointerEvents: "none" }} icon={faCompass} />
                                        <span style={{ fontSize: "small", fontFamily: "MSB", position: 'absolute', bottom: 5 }}>{(ode.length - 1).toLocaleString()}</span>
                                    </div>
                                    <div className="option" onClick={(e) => {
                                        selectOption(e)
                                        document.querySelector("#near").classList.remove("dconsel")
                                        document.querySelector("#facilities").classList.remove("dconsel")
                                        document.querySelector("#comments").classList.remove("dconsel")
                                        document.querySelector("#facilities").classList.add("dconsel")
                                        document.querySelector("#facilities").scrollIntoView({ behavior: "smooth" })
                                    }}>
                                        <FontAwesomeIcon style={{ pointerEvents: "none" }} icon={faSuitcaseRolling} />
                                        <span style={{ fontSize: "small", fontFamily: "MSB", position: 'absolute', bottom: 5 }}>{fac.length.toLocaleString()}</span>
                                    </div>
                                    <div className="option" onClick={(e) => {
                                        selectOption(e)
                                        document.querySelector("#near").classList.remove("dconsel")
                                        document.querySelector("#facilities").classList.remove("dconsel")
                                        document.querySelector("#comments").classList.remove("dconsel")
                                        document.querySelector("#comments").classList.add("dconsel")
                                        document.querySelector("#comments").scrollIntoView({ behavior: "smooth" })
                                        if (comments.length > 0) {
                                            document.querySelector(`#ccmbottomdiv`).scrollIntoView({ behavior: "smooth" })
                                            document.querySelector(`#ccmmbottomdiv`).scrollIntoView({ behavior: "smooth" })
                                        }
                                    }}>
                                        <FontAwesomeIcon style={{ pointerEvents: "none" }} icon={faComments} />
                                        <span style={{ fontSize: "small", fontFamily: "MSB", position: 'absolute', bottom: 5 }}>{comments.length}</span>
                                    </div>
                                    <div style={{ background: myKind.length > 0 && myKind[0].kind == 1 ? "rgba(14, 82, 34, 1)" : "transparent" }} className="option" onClick={() => {
                                        actUpon(1)
                                    }}>
                                        <FontAwesomeIcon style={{ pointerEvents: "none" }} icon={faThumbsUp} />
                                        <span style={{ fontSize: "small", fontFamily: "MSB", position: 'absolute', bottom: 5, pointerEvents: 'none' }}>{dlikes.filter(l => l.kind == 1).length.toLocaleString()}</span>
                                    </div>
                                    <div className="option" style={{ background: myKind.length > 0 && myKind[0].kind == 0 ? "rgb(105, 41, 55)" : "transparent" }} onClick={() => {
                                        actUpon(0)
                                    }} >
                                        <FontAwesomeIcon style={{ pointerEvents: "none" }} icon={faThumbsDown} />
                                        <span style={{ fontSize: "small", fontFamily: "MSB", position: 'absolute', bottom: 5, pointerEvents: 'none' }}>{dlikes.filter(l => l.kind == 0).length.toLocaleString()}</span>
                                    </div>
                                    <div className="option" >
                                        <FontAwesomeIcon style={{ pointerEvents: "none" }} icon={faShareAlt} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
export default Destination