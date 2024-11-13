const router = require('express').Router()

const db = require('../tourconstants/db')
const getWords = require('../tourconstants/getWords')

router.get('/', (req, res) => {
    let stt = getWords.lowerCase(req.query.q).filter(x => x.length > 1)
    let results = {}
    db.query('select * from places', (e, p) => {
        db.query(`select * from destinations`, (e, des) => {
            if (e) results.destinations = []
            let dest = des.filter(x => getWords.lowerCase(x.name).filter(x => x.length > 1).some(n => stt.includes(n))
                || getWords.lowerCase(x.description).filter(x => x.length > 1).some(n => stt.includes(n)))
            for (let i = 0; i < dest.length; i++) {
                dest[i].place = p.filter(x => x.id == des[i].place)[0]
            }
            results.destinations = dest
            db.query('select * from destinations order by dateadded desc', (e, d) => {
                db.query('select * from facilities', (e, f) => {
                    db.query(`select * from places`, (e, p) => {
                        if (e) results.places = []
                        let pl = p.filter(x => getWords.lowerCase(x.name).filter(x => x.length > 1).some(n => stt.includes(n))
                        || getWords.lowerCase(x.description).filter(x => x.length > 1).some(n => stt.includes(n)) 
                        || getWords.lowerCase(x.country).filter(x => x.length > 1).some(n => stt.includes(n)))
                        for (let i = 0; i < p.length; i++) {
                            p[i].destinations = d.filter(x => x.place == p[i].id)
                            p[i].facilities = f.filter(x => x.place == p[i].id)
                        }
                        results.places = pl
                        return res.send(results)
                    })
                })
            })
            
        })
    })
})

module.exports = router