const db = require('./db')

function verifyToken(req, res, next) {
    if (!req.header('authtoken')) return res.status(400).send('Invalid Token')
    db.query(`select * from authtokens where token = '${req.header('authtoken')}'`, (e, t) => {
        if (e) return res.status(400).send(e)
        if(t.length < 1) return res.status(400).send('Null Token!')
        db.query(`select userid, email, image, name, dateadded from users where userid='${t[0].user}'`, (e, u) => {
            if (e) return res.status(400).send(e)
            if(u.length < 1) return res.status(400).send('No User Assigned the Token!')
            let vU = u[0]
            req.user = vU
            return next()
        })
    })
}

module.exports = verifyToken