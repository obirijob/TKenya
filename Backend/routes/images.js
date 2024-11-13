const router = require('express').Router()

const conn = require('../tourconstants/db')
const randomN = require('../tourconstants/randomInt')

router.get('/', (req,res)=>{
    conn.query('select * from images', (e,r)=>{
        if(e)return res.status(400).send(e)
        return res.send(r)
    })
})
router.get('/random', (req,res)=>{
    conn.query('select * from images', (e,r)=>{
        if(e)return res.status(400).send(e)
        let rn = [];
        for(var i=0; i < 4; i++){
            let rnn = randomN(0, r.length-1)
            if(rn.includes(rnn)) i--
            else rn.push(rnn)
        }
        let imgs = []
        rn.forEach(ra => {
            imgs.push(r[ra])
        })  
        return res.send(imgs)    
    })
})

module.exports = router
