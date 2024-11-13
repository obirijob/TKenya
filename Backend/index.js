const app = require('express')();
const http = require('http').Server(app);
const port = 2000;
const cors = require('cors')
const bodyParser = require("body-parser");

const io = require('socket.io')(http, { cors: { origin: "*" } });

const images = require('./routes/images')
const staticfiles = require('./routes/static')
const destinations = require('./routes/destinations')
const places = require('./routes/places')
const facilities = require('./routes/facilities')
const google = require('./routes/google')
const accounts = require('./routes/accounts')
const search = require('./routes/search')
const likes = require('./routes/likes')
const comments = require('./routes/comments')

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

app.use('/images', images)
app.use('/files', staticfiles)
app.use('/destinations', destinations)
app.use('/places', places)
app.use('/facilities', facilities)
app.use('/google', google)
app.use('/accounts', accounts)
app.use('/search', search)
app.use('/likes', likes)
app.use('/comments', comments)

http.listen(port, () => console.log(`Listening on port ${port}`));