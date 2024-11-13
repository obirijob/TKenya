const router = require('express').Router()

const db = require('../tourconstants/db')
const verifyToken = require('../tourconstants/tokenVerification')

router.get('/e/:id', (req, res) => {
    db.query(`select *, id as comid, 
    (select image from users where userid=user) as image, 
    (select name from users where userid=user) as name,
    (select count(id) from likes where kind ='1' and entity like CONCAT('C-', comments.id)) as thumbsup,
    (select count(id) from likes where kind ='0' and entity like CONCAT('C-', comments.id)) as thumbsdown,
    (select count(id) from comments where entity like CONCAT('C-', comid)) as replies
     from comments where entity='${req.params.id}'`, (e, c) => {
        if (e) return res.status(400).send(e)
        return res.send(c)
    })
})

router.post('/:id', verifyToken, (req, res) => {
    if (req.body.message == null || req.body.message.length < 1)
        return res.status(400).send('Null Message')
    db.query(`insert into comments set ?`, [{
        user: req.user.userid,
        entity: req.params.id,
        message: req.body.message
    }], (e, c) => {
        if (e) return res.status(400).send(e)
        return res.send("Made")
    })
})

module.exports = router