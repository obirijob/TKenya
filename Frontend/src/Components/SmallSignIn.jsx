import './css/smallsignin.css'
import c from '../myConstants'
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import { TimesIcon } from 'react-line-awesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gsap from 'gsap'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function handleGoogleLogin(d, p) {
    fetch(`${c.backendUrl}/google/login`, {
        method: "POST",
        body: JSON.stringify({
            token: d.tokenId
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async r => {
        if (r.ok) {
            let resp = await r.json()
            localStorage.setItem('authtoken', resp.token)
            p.refreshLogin(resp)
        }
    })
}

function SmallSignIn(params) {
    return (
        <div className="smallsignin">
            <TimesIcon onClick={() => {
                gsap.fromTo('.smallsignin', 1, { opacity: 1, pointerEvents: "all", y: 0 }, { opacity: 0, pointerEvents: "none", y: 30 })
            }} className="close" />
            <div id="smallSignIn">
                <b>Sign In</b>
                <div className="input">
                    <input type="email" id="smsemail" placeholder="Email" />
                    <input type="password" id="smspassword" placeholder="Password" />
                    <b style={{ padding: '.5rem', display: 'none', fontSize: 'small', fontFamily: 'MSB' }} id="smsresp"></b>
                    <div style={{height: '.5rem'}} >{" "}</div>
                    <forgotpassword>Forgot Password</forgotpassword>
                    <div style={{height: '.5rem'}} >{" "}</div>
                    <button style={{ display: 'flex', alignItems: 'center', outline: 'none' }} onClick={(e) => {
                        document.querySelector('#smsic').style.display = 'block'
                        document.querySelector('#smsresp').style.display = 'none'
                        e.target.style.pointerEvents = 'none'
                        fetch(`${c.backendUrl}/accounts/login`, {
                            method: 'POST', body: JSON.stringify({
                                email: document.querySelector("#smsemail").value,
                                password: document.querySelector("#smspassword").value,
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(async r => {
                            if (r.ok) {
                                let rr = await r.json();
                                document.querySelector('#smsic').style.display = 'none'
                                document.querySelector('#smsresp').style.color = 'green'
                                document.querySelector('#smsresp').style.display = 'block'
                                document.querySelector('#smsresp').innerText = 'Logged In'
                                e.target.style.pointerEvents = 'all'
                                localStorage.setItem('authtoken', rr.token)
                                params.refreshLogin(rr)
                            } else {
                                let rr = await r.text()
                                document.querySelector('#smsic').style.display = 'none'
                                document.querySelector('#smsresp').style.color = 'red'
                                document.querySelector('#smsresp').style.display = 'block'
                                document.querySelector('#smsresp').innerText = `${rr}`
                                e.target.style.pointerEvents = 'all'
                            }
                        })}}><FontAwesomeIcon icon={faCircleNotch} className="rotating" id="smsic" style={{ marginRight: ".5rem", display: 'none' }} />
                            Sign In</button>
                </div>
                <div className="actions">
                    <GoogleLogin
                        style={{
                            borderRadius: "100px"
                        }}
                        clientId={c.googleCode}
                        buttonText="Log in with Google"
                        onSuccess={(g) => { handleGoogleLogin(g, params) }}
                        onFailure={() => { }}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                <hr />
                <button className="signup" onClick={() => {
                    document.querySelector('#smallSignIn').style.display = 'none';
                    document.querySelector('#smallSignUp').style.display = 'block';
                }}>Sign Up</button>
            </div>
            <div id="smallSignUp">
                <b>Create an Account</b>
                <div className="input">
                    <input type="text" id="smsuname" placeholder="Your Name" />
                    <input type="email" id="smsuemail" placeholder="Email Address" />
                    <input type="password" id="smsupassword" placeholder="Password" />
                    <b style={{ padding: '.5rem', display: 'none', fontSize: 'small', fontFamily: 'MSB' }} id="smsuresp"></b>
                    <button style={{ display: 'flex', alignItems: 'center', outline: 'none' }} onClick={(e) => {
                        document.querySelector('#smsuic').style.display = 'block'
                        document.querySelector('#smsuresp').style.display = 'none'
                        e.target.style.pointerEvents = 'none'
                        fetch(`${c.backendUrl}/accounts/signup`, {
                            method: 'POST', body: JSON.stringify({
                                name: document.querySelector("#smsuname").value,
                                email: document.querySelector("#smsuemail").value,
                                password: document.querySelector("#smsupassword").value,
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).then(async r => {
                            if (r.ok) {
                                let rr = await r.text();
                                document.querySelector('#smsuic').style.display = 'none'
                                document.querySelector('#smsuresp').style.color = 'green'
                                document.querySelector('#smsuresp').style.display = 'block'
                                document.querySelector('#smsuresp').innerText = rr
                                e.target.style.pointerEvents = 'all'
                            } else {
                                let rr = await r.text()
                                document.querySelector('#smsuic').style.display = 'none'
                                document.querySelector('#smsuresp').style.color = 'red'
                                document.querySelector('#smsuresp').style.display = 'block'
                                document.querySelector('#smsuresp').innerText = `${rr}`
                                e.target.style.pointerEvents = 'all'
                            }
                        })
                    }}><FontAwesomeIcon icon={faCircleNotch} id="smsuic" className="rotating" style={{ marginRight: ".5rem", display: 'none' }} />
                        Sign Up</button>
                </div>
                <hr />
                <button className="signup" onClick={() => {
                    document.querySelector('#smallSignIn').style.display = 'block';
                    document.querySelector('#smallSignUp').style.display = 'none';
                }}>Sign In</button>
            </div>
        </div>
    )
}

export default SmallSignIn