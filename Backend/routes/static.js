const router = require('express').Router()

const db = require('../tourconstants/db')

router.get('/images/:file', (req, res) => {
    return res.sendFile(`/pic/${req.params.file}`, { root: 'staticfiles' })
})

router.get('/imagebyid/:id', (req, res)=>{
    db.query(`select url from images where id = '${req.params.id}' limit 1`, (e,i)=>{
        if(e) return res.status(400).send(e)
        if(i.length < 1) return res.status(404).send("Image not Found")
        return res.sendFile(`/pic/${i[0].url.split('/')[2]}`, { root: 'staticfiles' })
    })
})

router.get('/facility/imagebyid/:id', (req, res)=>{
    db.query(`select url from images_facility where id = '${req.params.id}' limit 1`, (e,i)=>{
        if(e) return res.status(400).send(e)
        if(i.length < 1) return res.status(404).send("Image not Found")
        return res.sendFile(`/facilities/${i[0].url.split('/')[1]}`, { root: 'staticfiles' })
    })
})

router.get('/videos/:file', (req, res) => {
    return res.sendFile(`/vid/${req.params.file}`, { root: 'staticfiles' })
})

router.get('/images/user/:file', (req,res)=>{
    return res.sendFile(`/userimg/${req.params.file}`, { root: 'staticfiles' })
})

module.exports = router