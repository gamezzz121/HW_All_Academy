const express = require('express');
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')

const jwtsecret = "game"

const sqlpool = mysql.createPool({
    namedPlaceholders: true,
    charset: 'utf8',
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "homework5",
})
sqlpool.query('select * from employee', (err, result) => {
    console.log({err,result})

})


const app = express();
app.use(express.json());

app.use((req, response, next)=>{
    if(req.path == "/login") return next()

    const authheader = req.headers.authorization

    if(!authheader) return response.json({msg: "Error unauthorize"})

    jwt.verify(authheader.split(' ')[1], jwtsecret, (err, result) => {
        if (err) {
            return response.json({msg: "Error unauthorize"})
        }
        next()
    })
})

app.post('/login', (req, response) => {
    // console.log(req.body.user);
    // console.log(req.body.pass);
    if (req.body.user == "gamezzz121" && req.body.pass == "6252300292") {
        console.log(`login pass`);
        const token = jwt.sign({ username: "gamezzz121" }, jwtsecret)
        console.log(token);
        return response.json({token})
    }
    return response.status(400).send("Error invalid data");
})

app.get('/get', (req, response) => {
    const sql = 'select * from employee'
    sqlpool.query(sql, (err, result) => {
        if(err) {
            return response.status(400).json(err)
        }
        return response.json({ data: result })
    })
})

app.post('/post', (req, response) => {
    if(
        !req.body.id ||
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.pos ||
        !req.body.tel ||
        !req.body.email
        ) {
        return response.status(400).send("Error invalid data");
    }

    const sql = 'insert into employee value (:id,:fname, :lname,  :pos, :tel, :email)'
    sqlpool.query(sql, {
        id: req.body.id,
        fname: req.body.firstname,
        lname: req.body.lastname,
        pos: req.body.pos,
        tel: req.body.tel,
        email: req.body.email
    }, (err, result) => {
        if(err) {
            return response.status(400).json(err)
        }
        return response.json({ data: "post succeed" })
    })
})

app.put('/put', (req, response) => {
    if(
        !req.body.id ||
        // !req.body.firstname ||
        // !req.body.lastname ||
        !req.body.pos ||
        !req.body.tel ||
        !req.body.email
        ) {
        return response.status(404).send("Error invalid data");
    }
    
    const sql = 'update employee set pos = :pos, tel = :tel, email = :email where id = :id'
    sqlpool.query(sql, {
        id: req.body.id,
        pos: req.body.pos,
        tel: req.body.tel,
        email: req.body.email
    }, (err, result) => {
        if(err) {
            return response.status(400).json(err)
        }
        if(result.affectedRows == 0) return response.status(400).json({data: "id not found"})
        return response.json({ data: "put succeed" })
    })
})

app.delete('/delete', (req, response) => {
    if(!req.body.id) return response.status(400).send("Error invalid data");
    
    const sql = 'delete from employee where id = :id'
    sqlpool.query(sql, {
        id: req.body.id
    }, (err, result) => {
        if(err) {
            return response.status(400).json(err)
        }
        if(result.affectedRows == 0) return response.status(400).json({data: "id not found"})
        return response.json({ data: "delete succeed" })
    })
})

app.listen(3000 , () => {
    console.log(`Listening on port: 3000`);
});
