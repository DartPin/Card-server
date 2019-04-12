const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
var fs = require("fs");
var jsonParser = bodyParser.json();

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || config.port,
    () => console.log(`Server start on port ${config.port} ...`))

//отправка данных в клиент

app.get('/', (req, res) => {
    var content = fs.readFileSync("./src/data/data.json", "utf8");
    var data = JSON.parse(content);
    res.send(data);
})

//прием данных с клиента
app.post("/", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    var content = [];
    for (var i = 0; i < 3; i++) {
        for (var n = 0; n < req.body.body[i].length; n++) {
            delete req.body.body[i][n].text
            delete req.body.body[i][n].lang
            delete req.body.body[i][n].clr
            delete req.body.body[i][n].leave
            content.push(req.body.body[i][n])
        }
    }

    console.log(content)
    var data = JSON.stringify(content);
    fs.writeFileSync("./src/data/data.json", data, "utf8")
})