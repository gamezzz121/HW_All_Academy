const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const express = require('express');
const app = express();
const port = 3000;
const ID = "suphanat";
const password = '6252300292';

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/login.html")
});


app.get('/home', (req, res) => {
    if(!req.cookies.token) return res.redirect('/error')

    jwt.verify(req.cookies.token, password, (err, result) => {
        if(err) {
            return res.redirect('/error')
        }
        res.sendFile(__dirname + "/data.html")
    })
});

app.get('/error', (req, res) => {
    res.sendFile(__dirname + "/error.html")
});

app.post('/login', (req, res) => {
    if(req.body.user == ID && req.body.pass == password){
        const token = jwt.sign({username: ID}, password)
        res.cookie('token', token)
        res.redirect('/home')
    }
    else {
        res.cookie('token', "")
        res.redirect('/home')
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});