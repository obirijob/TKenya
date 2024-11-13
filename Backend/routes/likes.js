const router = require('express').Router()

const db = require('../tourconstants/db')
const verifyToken = require('../tourconstants/tokenVerification')


router.get('/my-e/:id', verifyToken, (req, res) => {
    db.query(`select * from likes where entity='${req.params.id}' and user='${req.user.userid}'`, (e, l) => {
        if (e) return res.status(400).send(e)
        //console.log(l)
        return res.send(l)
    })
})

router.post('/:id/:kind', verifyToken, (req, res) => {
    if (req.params.kind == null || req.params.kind < 0 || req.params.kind > 1) return res.status(400).send('Invalid Action')
    db.query(`select * from likes where entity='${req.params.id}' and user='${req.user.userid}'`, (e, l) => {
        if (e) return res.status(400).send(e)
        if (l.length < 1) {
            let like = { entity: `${req.params.id}`, kind: req.params.kind, user: req.user.userid }
            db.query('insert into likes set ?', [like], (e, rl) => {
                if (e) return res.status(400).send(e)
                return res.send("Acted Upon")
            })
        }
        else {
            //get the previous action
            let pa = l[0].kind
            if (pa == req.params.kind) {
                db.query(`delete from likes where id='${l[0].id}'`, (e, rlk) => {
                    if (e) return res.status(400).send(e)
                    return res.send("Acted Upon")
                })
            } else {
                db.query(`delete from likes where id='${l[0].id}'`, (e, rlk) => {
                    if (e) return res.status(400).send(e)
                    let like = { entity: `${req.params.id}`, kind: req.params.kind, user: req.user.userid }
                    db.query('insert into likes set ?', [like], (e, rl) => {
                        if (e) return res.status(400).send(e)
                        return res.send("Acted Upon")
                    })
                })
            }
        }
    })
})

router.get('/e/:id', (req, res) => {
    db.query(`select * from likes where entity = '${req.params.id}'`, (e, r) => {
        if (e) return res.status(400).send(e)
        return res.send(r)
    })
})



module.exports = router