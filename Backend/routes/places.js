const router = require('express').Router()

const db = require('../tourconstants/db')
const randomInt = require('../tourconstants/randomInt')

router.get('/', (req, res) => {
    db.query('select * from destinations order by dateadded desc', (e, d) => {
        db.query('select * from facilities', (e, f) => {
            db.query('select * from places', (e, p) => {
                if (e) return res.status(400).send(e)
                for (let i = 0; i < p.length; i++) {
                    p[i].destinations = d.filter(x => x.place == p[i].id)
                    p[i].facilities = f.filter(x => x.place == p[i].id)
                }
                return res.send(p)
            })
        })
    })
})

router.get('/random', (req, res) => {
    db.query('select * from destinations order by dateadded desc', (e, d) => {
        db.query('select * from facilities', (e, f) => {
            db.query(`select *, (select count(id) from destinations where place = places.id) as c from places`, (e, p) => {
                if (e) return res.status(400).send(e)
                for (let i = 0; i < p.length; i++) {
                    p[i].destinations = d.filter(x => x.place == p[i].id)
                    p[i].facilities = f.filter(x => x.place == p[i].id)
                }
                let pp = p.filter(x => x.c > 0)
                let xx = req.query.prev
                do {
                    xx = randomInt(0, pp.length - 1)
                }
                while (xx == req.query.prev)
                let p2 = pp[xx]
                p2.rnd = xx
                return res.send(p2)
            })
        })
    })
})

router.get('/:id', (req, res) => {
    db.query('select * from destinations order by dateadded desc', (e, d) => {
        db.query('select * from facilities', (e, f) => {
            db.query(`select *, (select count(id) from destinations where place = places.id) as c from places where id='${req.params.id}'`, (e, p) => {
                if (e) return res.status(400).send(e)
                for (let i = 0; i < p.length; i++) {
                    p[i].destinations = d.filter(x => x.place == p[i].id)
                    p[i].facilities = f.filter(x => x.place == p[i].id)
                }
                let pp = p.filter(x => x.c > 0)
                let xx = req.query.prev
                do {
                    xx = randomInt(0, pp.length - 1)
                }
                while (xx == req.query.prev)
                let p2 = pp[xx]
                p2.rnd = xx
                return res.send(p2)
            })
        })
    })
})

module.exports = router