import GoogleLogin from 'react-google-login'

import c from '../myConstants'

function handleGoogleLogin(d) {
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
            console.log(resp)
        }
    })
}

function Login(params) {
    return (<>
        <div>Login</div>
        <GoogleLogin
            clientId={c.googleCode}
            buttonText="Log in with Google"
            onSuccess={handleGoogleLogin}
            onFailure={() => { }}
            cookiePolicy={'single_host_origin'}
        />
    </>)
}

export default Login