const router = require('express').Router()

const db = require('../tourconstants/db')
const randomInt = require('../tourconstants/randomInt')

router.get('/', (req, res) => {
    db.query('select * from places', (e, p) => {
        db.query(`select * from destinations`, (e, des) => {
            if (e) return res.status(400).send(e)
            for (let i = 0; i < des.length; i++) {
                des[i].place = p.filter(x => x.id == des[i].place)[0]
            }
            return res.send(des)
        })
    })
})

router.get('/:id', (req, res) => {
    db.query('select * from places', (e, p) => {
        db.query(`select * from destinations where id='${req.params.id}'`, (e, des) => {
            if (e) return res.status(400).send(e)
            for (let i = 0; i < des.length; i++) {
                des[i].place = p.filter(x => x.id == des[i].place)[0]
            }
            if(des.length < 1) return res.status(404).send("Destination Not Found")
            return res.send(des)
        })
    })
})

router.get('/inplace/:id', (req,res)=>{
    db.query('select * from places', (e, p) => {
        db.query(`select * from destinations where place = '${req.params.id}'`, (e, des) => {
            if (e) return res.status(400).send(e)
            for (let i = 0; i < des.length; i++) {
                des[i].place = p.filter(x => x.id == des[i].place)[0]
            }
            return res.send(des)
        })
    })
})
module.exports = router