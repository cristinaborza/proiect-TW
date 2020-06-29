let express = require('express')
let bodyParser = require('body-parser');
let session = require('express-session');
let crypto = require('crypto');
let app = express()
let port = 3000;

const fs = require('fs');

let comentarii = fs.readFileSync('data/comentarii.json'); 
let comentBD = JSON.parse(comentarii);

let rawdata = fs.readFileSync('data/users.json'); 
let userBD = JSON.parse(rawdata);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, access-control-allow-origin")
  next();
});

app.use(session({
    secret: 'Yamaha',
    resave: true,
    saveUninitialized: false
    }
));

app.use(express.static(__dirname));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index.ejs', { root: __dirname });
});

app.get('/saveMoney', function (req, res) {
    res.render('saveMoney.ejs', { root: __dirname });
});

app.get('/chepAirfare', function (req, res) {
    res.render('chepAirfare.ejs', { root: __dirname });
});

app.get('/chepAccommdation', function (req, res) {
    res.render('chepAccommdation.ejs', { root: __dirname });
});

app.get('/AmsterdamBlog', function (req, res) {
    res.render('AmsterdamBlog.ejs', { root: __dirname });
});

app.get('/IsraelBlog', function (req, res) {
    res.render('IsraelBlog.ejs', { root: __dirname });
});

app.get('/destination', function (req, res) {
    res.render('destination.ejs', { root: __dirname });
});

app.get('/italy', function (req, res) {
    res.render('italy.ejs', { root: __dirname });
});

app.get('/spain', function (req, res) {
    res.render('spain.ejs', { root: __dirname });
});

app.get('/japan', function (req, res) {
    res.render('japan.ejs', { root: __dirname });
});

app.get('/australia', function (req, res) {
    res.render('australia.ejs', { root: __dirname });
});

app.get('/comentarii', function (req, res) {
    res.render('comentarii.ejs', { root: __dirname, BD: comentBD});
});

app.get('/travelInsurance', function (req, res) {
    res.render('travelInsurance.ejs', { root: __dirname });
});

app.get('/canada', function (req, res) {
    res.render('canada.ejs', { root: __dirname });
});

app.get('/travelBooks', function (req, res) {
    res.render('travelBooks.ejs', { root: __dirname });
});

app.get('/contact', function (req, res) {
    res.render('contact.ejs', { root: __dirname });
});

app.get('/quiz', function (req, res) {
    res.render('quiz.ejs', { root: __dirname });
});

app.get('/login', function (req, res) {
    res.render('login', {user: req.session.username});
});

app.get('/profile', function (req, res) {
    res.render('profile',{user: req.session.username});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function add_comm(DateComm){
    comentBD['comentarii'].push(DateComm);
    comentBD['nextId'] = parseInt(comentBD['nextId']) + 1;
    console.log(comentBD);
    let data = JSON.stringify(comentBD);
    fs.writeFileSync("data/comentarii.json", data);
}

app.post('/contact', function (req, res) {
    add_comm({
        ...req.body,
        id: comentBD.nextId
    });
    res.render('add_successful.ejs', { root: __dirname });
});

app.post('/login', function(req, res) {
    let cifru = crypto.createCipher('aes-128-cbc', 'HarleyDavidson');

    console.log(req.body.parola)

    let encrParola= cifru.update(req.body.parola, 'utf8', 'hex');

    encrParola+=cifru.final('hex');
    console.log(encrParola);
        
    userFound = {}
    for( let i = 0; i <userBD.length; i++){
        if(userBD[i].username === req.body.username && userBD[i].parola === encrParola){
            userFound = userBD[i];
        }
        if(userFound.username){
            req.session.username=userBD[i];
        }
    }
    
    if (req.session.username == undefined) {
        res.render('login.ejs', { root: __dirname });
    }
    res.render('profile',{user: req.session.username});
})

app.post('/logout', function(req, res) {
    req.session.destroy();
    res.send();
})


app.get('/comentarii/BD', function(req, res){
    res.send(comentBD);
});

app.use(function(req, res){
    res.status(404).sendFile('html/404.html', { root: __dirname });
});

// Start the server
app.listen(port, () => {
    console.log(`Express.JS Server is running on http://localhost:${port}`)
});