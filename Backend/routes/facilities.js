const router = require('express').Router()

const db = require('../tourconstants/db')
const randomInt = require('../tourconstants/randomInt')

router.get('/inplace/:place', (req,res)=>{
    db.query(`select * from facilities where place ='${req.params.place}'`,(e,r)=>{
        return res.send(r)
    })
})

module.exports = router