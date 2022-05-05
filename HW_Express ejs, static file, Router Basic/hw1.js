const express = require('express');
const game24solver = require('24game-solver/dist/24game-solver')
const app = express();
const port = 3000;

app.get('/sum', (req, res) => {
    let num1 = Number(req.query.num1);
    let num2 = Number(req.query.num2);
    let num3 = Number(req.query.num3);
    let num4 = Number(req.query.num4);

    if(num1<1 || num1>9 ){
        res.status(403).send('error')
    }else if(num2<1 || num2>9 ){
        res.status(403).send('error')
    }else if(num3<1 || num3>9 ){
        res.status(403).send('error')
    }else if(num4<1 || num4>9 ){
        res.status(403).send('error')
    }
    let sum = game24solver([num1,num2,num3,num4],24);

    if (sum!=''){
        res.send(`suscess<br>${sum}`);
    }else res.send(`fail`);

// res.send(`a = ${a}, b = ${b}<br>sum = ${a + b}`);
});



app.listen(port, () => {
console.log(`Listening at http://localhost:${port}`);
});