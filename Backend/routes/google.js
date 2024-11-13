const google = require('../tourconstants/google')

const router = require('express').Router()
const moment = require('moment')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(google.authKey)

const db = require('../tourconstants/db')

router.post('/login', async (req, res) => {
    const { token } = req.body
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: google.authKey
    });
    const pl = ticket.getPayload();
    let orimg = pl.picture

    let imgg = `${moment().format("YYMMDDHHmmssSSSS")}.jpg`

    pl.picture = `/files/images/user/${imgg}`
    let user = {
        email: pl.email,
        image: pl.picture,
        name: pl.name,
        password: "",
    }
    db.query(`select * from users where email='${user.email}'`, (e, u) => {
        if (u.length > 0) {
            let tk = {
                user: u[0].userid,
                token: pl.jti
            }
            db.query('insert into authtokens set ?', [tk], (e, t) => {
                if (e) return res.status(400).send(e)
                let us = { name: u[0].name, email: u[0].email, image: u[0].image, token: tk.token }
                return res.send(us)
            })
        }
        else {
            var fs = require('fs'),
                request = require('request');

            var download = async function (uri, filename, callback) {
                request.head(uri, function (err, res, body) {
                    console.log('content-type:', res.headers['content-type']);
                    console.log('content-length:', res.headers['content-length']);

                    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                });
            };
            download(orimg, `staticfiles/userimg/${imgg}`, function () {
                console.log('done');
            }).then(() => {
                db.query('INSERT INTO users SET ? ', [user], (e, r) => {
                    if (e) return res.status(400).send(e)
                    db.query(`select * from users where email='${user.email}'`, (e, u) => {
                        let tk = {
                            user: u[0].userid,
                            token: pl.jti
                        }
                        db.query('insert into authtokens set ?', [tk], (e, t) => {
                            if (e) return res.status(400).send(e)
                            let us = { name: u[0].name, email: u[0].email, image: u[0].image, token: tk.token }
                            return res.send(us)
                        })
                    })
                })
            })
        }
    })
})

module.exports = router