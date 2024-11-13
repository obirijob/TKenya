const router = require('express').Router()
const moment = require('moment')
const emC = require('../tourconstants/emaiConfirm')

const db = require('../tourconstants/db')
const ra = require('../tourconstants/randomInt')

router.get('/loggeduser/:token', (req, res) => {
    db.query(`select * from authtokens where token = '${req.params.token}' limit 1`, (e, t) => {
        if (e) return res.status(400).send(e)
        if (t.length < 1) return res.status(404).send("Token Not Found!")
        db.query(`select * from users where userid='${t[0].user}'`, (e, u) => {
            if (e) return res.status(400).send(e)
            if (u.length < 1) return res.status(404).send("Invalid User ID")
            let user = { name: u[0].name, email: u[0].email, image: u[0].image, token: t[0].token }
            return res.send(user)
        })
    })
})

router.post('/login', (req, res) => {
    if (req.body.password == null || req.body.password.length < 1 || req.body.email == null || req.body.email.length < 1) return res.status(401).send("Invalid Email or Password")
    db.query(`select * from users where email='${req.body.email}' and binary password ='${req.body.password}'`, (e, u) => {
        if (e) return res.status(400).send(e)
        if (u.length < 1) return res.status(401).send("Invalid Email or Password")
        if (u[0].emailv !== 1) return res.status(401).send("Email Not Verified")
        let tk = (`${u[0].userid * parseInt(moment().format('YYMMDD'))}-${ra(ra(111111, 222222), 999999)}-${moment().format("YYMMDD-HHmmss")}-${ra(ra(111111, 222222), 999999)}`)
        let us = { user: u[0].userid, token: tk }
        db.query(`insert into authtokens set ?`, [us], (e, r) => {
            if (e) return res.status(400).send(e)
            let userr = { name: u[0].name, email: u[0].email, image: u[0].image, token: tk }
            return res.send(userr)
        })
    })
})

router.post('/signup', (req, res) => {
    //confirm email
    if (!emC(req.body.email)) return res.status(400).send(`Invalid Email`)
    if (req.body.name == null || req.body.name < 1) return res.status(400).send("Name Cannot be null")
    if (req.body.password == null || req.body.password.length < 1) return res.status(400).send("Password Must be atleast six characters")
    db.query(`select * from users where email ='${req.body.email}'`, (e, rr) => {
        if (e) return res.status(400).send(e)
        if (rr.length > 0) return res.status(400).send("Email Registered")
        //generate email confirm token
        let tk = (`${parseInt(moment().format('ssMm'))}-${ra(ra(111111, 222222), 999999)}-${moment().format("YYMMDD-HHmmss")}-${ra(ra(111111, 222222), 999999)}`)
        let token = {
            email: req.body.email,
            token: tk
        }
        let user = {
            email: req.body.email.toLowerCase(),
            name: req.body.name.toLowerCase(),
            password: req.body.password,
        }
        db.query(`insert into users set ?`, [user], (e, u) => {
            if (e) return res.status(400).send(e)
            db.query('insert into email_ver_token set ?', [token], (e, r) => {
                if (e) return res.status(400).send(e)

                // Send email with link *** After Confirming ***

                return res.send("An email with activation link has been sent to your email")
            })
        })
    })
})

router.get('/verifyemail/:token', (req,res)=>{
    db.query(`select * from email_ver_token where token = '${req.params.token}'`, (e,r)=>{
        if(e) return res.status(400).send(e)
        if(r.length < 1) return res.status(400).send('Token Not Found')
        db.query(`update users set emailv='1' where email='${r[0].email}'`, (e,uv)=>{
            if(e) return res.status(400).send(e)
            return res.send("Email Verified")
        })
    })
})

router.post('/signout', (req, res) => {
    db.query(`DELETE FROM authtokens WHERE (token = '${req.body.token}' and id != '0');`, (e, r) => {
        return res.send("Logged Out")
    })
})

module.exports = router